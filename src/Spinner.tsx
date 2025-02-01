import React, { useState, useEffect } from 'react';

const Spinner: React.FC = () => {
    // Optionally, you can use state to manage spinner visibility if needed
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading (you can replace this with actual loading logic)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false); // Hide the spinner after 3 seconds
        }, 3000);
    }, []);

    return (
        <>
            {isLoading && (
                <div
                    id="spinner"
                    className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50 d-flex align-items-center justify-content-center"
                >
                    <div className="spinner-grow text-primary" role="status"></div>
                </div>
            )}
        </>
    );
};

export default Spinner;
