import React from 'react';
import { fetchData } from '../services/api';
import { API_ENDPOINTS } from '../api/apiEndpoints';

interface categories {
    "_id": string,
    "name": string,
    "fruitCount": number
}
type Fruits = {
    "_id": string,
    "name": string,
    "category": string,
    "image": string,
    "description": string,
    "price": string,
}

interface CategoriesComponentProps {
    categoriesData: categories[];
    fruitsData: Fruits[],
    setFruits: (fruits: Fruits[]) => void;
    setTotalPages: (page: number)=>void;

}

const Categories: React.FC<CategoriesComponentProps> = ({ categoriesData: categories, fruitsData: fruits, setFruits, setTotalPages }) => {

    const handleFiltercategory = (categoryId: string) => {
        fetchData({API_URL: API_ENDPOINTS.CATEGORIES.api, categoryId})
        .then((result)=>{
            if(result.error){
                console.error(result.error)
            }
            else{
                setFruits(result.fruits);
                setTotalPages(result.fruits.length);
            }
        })
        .catch((error)=>console.error("unexpected error occured"))
    }

    return (
        <div className="mb-3" >
            <h4>Categories</h4>
            <ul className="list-unstyled fruite-categorie">
                {categories.map((category, index) =>
                (
                    <li key={index}>
                        <div className="d-flex justify-content-between fruite-name">
                            <button className="categories_button" onClick={() => handleFiltercategory(category._id)}><i className="fas fa-layer-group me-2"></i>{category.name}</button>
                            <span>({category.fruitCount})</span>
                        </div>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default Categories;