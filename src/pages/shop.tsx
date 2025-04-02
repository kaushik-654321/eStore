import React, { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import { fetchData } from '../services/api';
import Pagination from './Pagination';
import FruitsComponent from './Fruits';
import Categories from './Categories';
import { API_ENDPOINTS } from '../api/apiEndpoints';


type Fruits = {
    "_id": string,
    "name": string,
    "category": string,
    "image": string,
    "description": string,
    "price": string,
    "categoryDetails": {
        "_id": string;
        "name": string
    }
}

type Categories = {
    "_id": string,
    "name": string,
    "fruitCount": number
}
const Shop: React.FC = () => {
    const [fruits, setFruits] = useState<Fruits[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<number>(0);
    const limit = 6;

    useEffect(() => {

        fetchData({ API_URL: API_ENDPOINTS.CATEGORIES.api, })
            .then((result) => {
                if (result.error) {
                    console.error(result.error);
                }
                else {
                    setCategories(result)
                }
            })
            .catch((error) => console.error("unexpected error occured"))
    }, [])



    useEffect(() => {

        fetchData({ API_URL: API_ENDPOINTS.FRUITS.api, limit, page: currentPage, searchQuery: search, categoryId: category, sortsData: sort, minPrice: 0, maxPrice: debouncedMaxPrice })
            .then((result) => {
                if (result.error) {
                    console.error(result.error);
                } else {

                    setFruits(result.fruits);
                    setTotalPages(result.totalFruits);
                }
            })
            .catch((err) => console.error("Unexpected error occurred"));
    }, [currentPage, query, category, sort, debouncedMaxPrice])

    useEffect(() => {
        const delayDebouncefn = setTimeout(() => {
            setCurrentPage(1);
            setQuery(search);
        }, 500);

        return () => { clearTimeout(delayDebouncefn) }
    }, [search])

    useEffect(() => {
        const delayDebouncefn = setTimeout(() => {
            setDebouncedMaxPrice(maxPrice)
        }, 500)
        return () => { clearTimeout(delayDebouncefn) }
    }, [maxPrice])

    return (
        <>
            <SearchModal />
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            <div className="container-fluid fruite py-5"></div>

            <div className="container py-5">
                <h1 className="mb-4 text-start">Fresh fruits shop</h1>
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <div className="input-group w-100 mx-auto d-flex">
                                    <input type="search" className="form-control p-3" onChange={(e) => setSearch(e.target.value)} placeholder="keywords" aria-describedby="search-icon-1" />
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                </div>
                            </div>
                            <div className="col-6"></div>
                            <div className="col-xl-3">
                                <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                    <label htmlFor="fruits">Default Sorting:</label>
                                    <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform" onChange={(e) => setSort(e.target.value)}>
                                        <option value="">Nothing</option>
                                        <option value="popularity">Popularity</option>
                                        <option value="organic">Organic</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        {categories ? <Categories categoriesData={categories} setCategory={setCategory} /> : ""}
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4 className="mb-2">Price</h4>
                                            <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min="0" max="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                                            <output id="amount" name="amount" min-velue="0" max-value="500" htmlFor="rangeInput"> {maxPrice > 0 ? `Upto - $ ${maxPrice}` : 0}</output>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>Additional</h4>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-1" name="Categories-1" value="Beverages" />
                                                <label htmlFor="Categories-1"> Organic</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-2" name="Categories-1" value="Beverages" />
                                                <label htmlFor="Categories-2"> Fresh</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-3" name="Categories-1" value="Beverages" />
                                                <label htmlFor="Categories-3"> Sales</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-4" name="Categories-1" value="Beverages" />
                                                <label htmlFor="Categories-4"> Discount</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-5" name="Categories-1" value="Beverages" />
                                                <label htmlFor="Categories-5"> Expired</label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-12">
                                        <h4 className="mb-3">Featured products</h4>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                                <img src="img/featur-1.jpg" className="img-fluid rounded" alt="" />
                                            </div>
                                            <div>
                                                <h6 className="mb-2">Big Banana</h6>
                                                <div className="d-flex mb-2">
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <div className="d-flex mb-2">
                                                    <h5 className="fw-bold me-2">2.99 $</h5>
                                                    <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                                <img src="img/featur-2.jpg" className="img-fluid rounded" alt="" />
                                            </div>
                                            <div>
                                                <h6 className="mb-2">Big Banana</h6>
                                                <div className="d-flex mb-2">
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <div className="d-flex mb-2">
                                                    <h5 className="fw-bold me-2">2.99 $</h5>
                                                    <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                                <img src="img/featur-3.jpg" className="img-fluid rounded" alt="" />
                                            </div>
                                            <div>
                                                <h6 className="mb-2">Big Banana</h6>
                                                <div className="d-flex mb-2">
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <div className="d-flex mb-2">
                                                    <h5 className="fw-bold me-2">2.99 $</h5>
                                                    <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center my-4">
                                            <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="position-relative">
                                            <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                                            <div className="position-absolute" style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}>
                                                <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row g-4 justify-content-center">
                                    {fruits.length > 0 ? <FruitsComponent fruitsData={fruits} /> : ''}
                                    <div className="col-12">
                                        <Pagination
                                            totalItems={totalPages}
                                            itemsPerPage={limit}
                                            currentPage={currentPage}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Shop;