import React from 'react';

const VegetableShop: React.FC = () => {
  return (
    <div className="container-fluid vesitable py-5">
      <div className="container py-5">
        <h1 className="mb-0">Fresh Organic Vegetables</h1>
        <div className="owl-carousel vegetable-carousel justify-content-center">
          {[
            {
              imgSrc: 'img/vegetable-item-6.jpg',
              title: 'Parsely',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
              price: '$4.99 / kg',
            },
            {
              imgSrc: 'img/vegetable-item-1.jpg',
              title: 'Parsely',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
              price: '$4.99 / kg',
            },
            {
              imgSrc: 'img/vegetable-item-3.png',
              title: 'Banana',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
              price: '$7.99 / kg',
            },
            {
              imgSrc: 'img/vegetable-item-4.jpg',
              title: 'Bell Papper',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
              price: '$7.99 / kg',
            },
            {
              imgSrc: 'img/vegetable-item-5.jpg',
              title: 'Potatoes',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
              price: '$7.99 / kg',
            },
            {
              imgSrc: 'img/vegetable-item-6.jpg',
              title: 'Parsely',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
              price: '$7.99 / kg',
            },
            {
              imgSrc: 'img/vegetable-item-5.jpg',
              title: 'Potatoes',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
              price: '$7.99 / kg',
            },
          ].map((item, index) => (
            <div key={index} className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src={item.imgSrc} className="img-fluid w-100 rounded-top" alt={item.title} />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: '10px', right: '10px' }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">{item.price}</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VegetableShop;
