import React from 'react';
type Fruits = {
    "_id": string,
    "name": string,
    "category": string,
    "image": string,
    "description": string,
    "price": string,
}
// Define Props Interface
interface FruitsComponentProps {
    fruitsData: Fruits[];
  }

const FruitsComponent: React.FC<FruitsComponentProps> = ({fruitsData:fruits}) => {
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
                    
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>{fruit.name}</h4>
                        <p>{fruit.description}</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">{`$ ${fruit.price} / kg`}</p>
                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                                <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default FruitsComponent;