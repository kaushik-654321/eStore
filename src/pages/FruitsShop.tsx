import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { Items, tabContentData, tabDataType } from '../types/item.type';
import { addToCart, addToCartServer } from '../features/cartSlice';


const FruitsShop: React.FC = () => {
    const [tabData, setTabData] = useState<tabDataType[]>([]);
    const [tab, setTab] = useState<string>('All Products');
    const [tabContent, setTabContent] = useState<tabContentData[]>([]);
    const [filteredTabContent, setFilteredTabContent] = useState<tabContentData[]>([]);
    const [visibleItems, setVisibleItems] = useState<tabContentData[]>([]);
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 8;
    const dispatch = useDispatch<AppDispatch>();
    const userObj = useSelector((state: RootState) => state.user);
    const { userId } = userObj;


    useEffect(() => {
        fetchData({ API_URL: API_ENDPOINTS.CATEGORIES.api }).then((result) => {
            if (result.error) {
                console.error('error');
            }
            const categories = result.map(({ _id, name }) => { return { _id, name } });
            setTabData([{ _id: 'All', name: 'All Products' }, ...categories]);
        }).catch((error) => console.error("unexpected error occured", error))
    }, [])


    useEffect(() => {
        fetchData({ API_URL: `${API_ENDPOINTS.FRUITS.api}/group` }).then((result) => {
            if (result.error) {
                console.error('error');
            }
            console.log(result.fruits);
            setTabContent([...result.fruits]);
            setFilteredTabContent([...result.fruits]);
            setVisibleItems(result.fruits.slice(0, itemsPerPage));
        })
    }, [])

    const loadMoreItems = () => {
        const nextPage = page + 1;
        const newItems = filteredTabContent.slice(0, nextPage * itemsPerPage); // Load next batch
        console.log(newItems)
        setVisibleItems(newItems);
        setPage(nextPage);
    };
    const handleTabClick = (SelectedTab: string) => {
        if (SelectedTab === 'All Products') {
            setFilteredTabContent([...tabContent]);
            setVisibleItems(tabContent.slice(0, itemsPerPage));
        }
        else {
            let filterData = tabContent.filter((item) => item.category == SelectedTab);
            setFilteredTabContent([...filterData]);
            setVisibleItems(filterData.slice(0, itemsPerPage));
        }
        setTab(SelectedTab);
        setPage(1);

    }

    const ItemaddTocart = (Itemdata: Items) => {
        if (userId) {
            dispatch(addToCartServer({ userId, cartItems: [{ _id: Itemdata._id, quantity: 1 }] }));
         }
        else {
            dispatch(addToCart({ _id: Itemdata._id, name: Itemdata.name, price: Itemdata.price, image: Itemdata.image }))
            localStorage.setItem('guest_cart_saved_at', Date.now().toString());
        }
    }

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-className text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Our Organic Products</h1>
                        </div>
                        <div className="col-lg-8 text-end">
                            <ul className="nav nav-pills d-inline-flex text-center mb-5">

                                {tabData && tabData.map((tabName) => (
                                    <li className="nav-item fruits-shop" key={tabName._id}>

                                        <a className={`d-flex m-2 py-2 rounded-pill ${tabName.name === tab ? 'bg-active' : 'bg-light'}`}
                                            data-bs-toggle="pill" href={`#tab-1`} onClick={() => handleTabClick(tabName.name)}>
                                            <span className="text-dark">{tabName.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content" id='tab-content'>
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-lg-12" id="scrollableDiv" >
                                    <InfiniteScroll
                                        dataLength={visibleItems.length} // Current items count
                                        next={loadMoreItems} // Function to load more items
                                        hasMore={visibleItems.length < tabContent.length} // Stop when all data is loaded
                                        loader={<h4>Loading...</h4>}
                                        // endMessage={<p>No more products to load</p>}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        <div className="row g-4" style={{ overflow: "auto" }}>
                                            {visibleItems.map((data) => (
                                                <div className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img src={data.image} className="img-fluid w-100 rounded-top" alt="" />
                                                        </div>
                                                        <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{data.category}</div>
                                                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                            <h4>{data.name}</h4>
                                                            <p>{data.description}</p>
                                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                                <p className="text-dark fs-5 fw-bold mb-0"> {`$${data.price} / kg`}</p>
                                                                <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => ItemaddTocart(data)}>
                                                                    <i className="fa fa-shopping-bag me-2 text-primary"></i>  Add to cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}


                                        </div>
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}


export default FruitsShop
