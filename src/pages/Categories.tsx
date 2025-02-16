import React from 'react';

interface categories {
    "_id": string,
    "name": string,
    "fruitCount": number
}

interface CategoriesComponentProps {
    categoriesData: categories[];
}

const Categories: React.FC<CategoriesComponentProps> = ({ categoriesData: categories }) => {
    return (
        <div className="mb-3">
            <h4>Categories</h4>
            <ul className="list-unstyled fruite-categorie">
                {categories.map((category) =>
                (
                    <li>
                        <div className="d-flex justify-content-between fruite-name">
                            <a href="#"><i className="fas fa-apple-alt me-2"></i>{category.name}</a>
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