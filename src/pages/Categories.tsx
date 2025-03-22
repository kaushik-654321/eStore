import React from 'react';


interface categories {
    "_id": string,
    "name": string,
    "fruitCount": number
}


interface CategoriesComponentProps {
    categoriesData: categories[];
    setCategory: (catId: string)=>void;

}

const Categories: React.FC<CategoriesComponentProps> = ({ categoriesData: categories, setCategory }) => {

    const handleFiltercategory = (categoryId: string) => {
        setCategory(categoryId)
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