import React from 'react';

interface Testimonial {
  quote: string;
  name: string;
  profession: string;
  image: string;
  rating: number; // From 1 to 5 stars
}

const testimonials: Testimonial[] = [
  {
    quote: "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Client Name",
    profession: "Profession",
    image: "img/testimonial-1.jpg",
    rating: 4,
  },
  {
    quote: "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Client Name",
    profession: "Profession",
    image: "img/testimonial-1.jpg",
    rating: 5,
  },
  {
    quote: "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Client Name",
    profession: "Profession",
    image: "img/testimonial-1.jpg",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="container-fluid testimonial py-5">
      <div className="container py-5">
        <div className="testimonial-header text-center">
          <h4 className="text-primary">Our Testimonial</h4>
          <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
        </div>
        <div className="owl-carousel testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item img-border-radius bg-light rounded p-4">
              <div className="position-relative">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: '30px', right: '0' }}></i>
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className="mb-0">{testimonial.quote}</p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src={testimonial.image} className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="" />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-dark">{testimonial.name}</h4>
                    <p className="m-0 pb-3">{testimonial.profession}</p>
                    <div className="d-flex pe-5">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < testimonial.rating ? 'text-primary' : ''}`}></i>
                      ))}
                    </div>
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

export default Testimonials;
