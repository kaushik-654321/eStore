import React from 'react';

const BestsellerProducts: React.FC = () => {
  const products = [
    { imgSrc: 'img/best-product-1.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/best-product-2.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/best-product-3.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/best-product-4.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/best-product-5.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/best-product-6.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/fruite-item-1.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/fruite-item-2.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/fruite-item-3.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
    { imgSrc: 'img/fruite-item-4.jpg', name: 'Organic Tomato', price: '3.12', stars: 4 },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <h1 className="display-4">Bestseller Products</h1>
          <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
        </div>
        <div className="row g-4">
          {products.map((product, index) => (
            <div key={index} className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img src={product.imgSrc} className="img-fluid rounded-circle w-100" alt={product.name} />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5">{product.name}</a>
                    <div className="d-flex my-3">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < product.stars ? 'text-primary' : ''}`}
                        ></i>
                      ))}
                    </div>
                    <h4 className="mb-3">{product.price} $</h4>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                      <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellerProducts;
