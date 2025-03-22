import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { API_ENDPOINTS } from '../api/apiEndpoints';

type tabDataType = {
    "_id": string,
    "name": string,
}

type tabContentData = {
    "_id": string,
    "name": string,
    "category": string,
    "image": string,
    "description": string,
    "price": string,
}

const FruitsShop: React.FC = () => {
    const [tabData, setTabData] = useState<tabDataType[]>([]);
    const [tab, setTab] = useState<string>('All Products');
    const [tabContent, setTabContent] = useState<tabContentData[]>([]);


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
            setTabContent([...result.fruits])
        })
    }, [])

    const handleTabClick = (tab: string) => {
        let filterData = tabContent.filter((item) => item.category == tab);
        console.log(filterData);
        setTab(tab);
        setTabContent([...filterData]);
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
                                    <li className="nav-item fruits-shop">
                                        <a className={`d-flex m-2 py-2 rounded-pill ${tabName.name === tab ? 'bg-active' : 'bg-light'}`}
                                            data-bs-toggle="pill" href={`#tab-1`} onClick={() => handleTabClick(tabName.name)}>
                                            <span className="text-dark">{tabName.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-lg-12">
                                    <div className="row g-4">
                                        {tabContent && tabContent.map((data) => (
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
                                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}


                                    </div>
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
