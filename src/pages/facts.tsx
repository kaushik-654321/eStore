import React from 'react';

const Facts: React.FC = () => {
  const facts = [
    { icon: 'fa-users', label: 'satisfied customers', value: 1963 },
    { icon: 'fa-users', label: 'quality of service', value: '99%' },
    { icon: 'fa-users', label: 'quality certificates', value: 33 },
    { icon: 'fa-users', label: 'Available Products', value: 789 },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="bg-light p-5 rounded">
          <div className="row g-4 justify-content-center">
            {facts.map((fact, index) => (
              <div key={index} className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5">
                  <i className={`fa ${fact.icon} text-secondary`}></i>
                  <h4>{fact.label}</h4>
                  <h1>{fact.value}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facts;
