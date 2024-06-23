// import React from 'react'
import React, { useState, useEffect } from 'react';
import './PaymentSuccess.css'

function Payment_Sucessfull() {

    const [showMessage, setShowMessage] = useState(false);

  // Simulating a delay before showing the success message
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="payment-success-container">
    {showMessage && (
      <div className="payment-success-message">
        <div className="success-icon">&#10003;</div>
        <div><span style={{marginLeft:"50px"}}>Payment Successful!</span><br></br>
           <span> Congrulations Your order is Placed</span>
        </div>
      </div>
    )}
  </div>
);

  
}

export default Payment_Sucessfull
