import React from 'react';
import { addToCart } from '../features/cartSlice';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { Items } from '../types/item.type';

// Define Props Interface
interface FruitsComponentProps {
    fruitsData: Items[];
}

const FruitsComponent: React.FC<FruitsComponentProps> = ({ fruitsData: fruits }) => {
    const dispatch = useDispatch<AppDispatch>();
    const ItemaddTocart = (Itemdata: Items) => {
        dispatch(addToCart({ _id: Itemdata._id, name: Itemdata.name, price: Itemdata.price, image: Itemdata.image }))
    }

  

    return (
        fruits?.map(fruit => (
            <div key={fruit._id} className="col-md-6 col-lg-6 col-xl-4">
                <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                        <img
                            src={fruit.image}
                            className="img-fluid w-100 rounded-top"
                            alt={fruit.name}
                        />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{fruit.categoryDetails.name}</div>

                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>{fruit.name}</h4>
                        <p>{fruit.description}</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">{`$ ${fruit.price} / kg`}</p>

                            <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => ItemaddTocart(fruit)}>
                                <i className="fa fa-shopping-bag me-2 text-primary"></i>  Add to cart
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default FruitsComponent;