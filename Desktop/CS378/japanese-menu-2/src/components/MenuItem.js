import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements


// This is a functional component that represents a single menu item. It currently takes in the title and displays it in an h2 element.
// Modify the component to take in all the other properties of a menu item you need and display them in the component.
// Use bootstrap to style the elements so that it looks like the mockup in the assignment.
// Hint: You can use the image name to get the image from the images folder.
const MenuItem = ({ item, cart, addToCart, removeFromCart }) => {
   const { title, description, price, imageName } = item;
   const quantity = cart[item.id] ? cart[item.id].quantity : 0;


   return (
       <div className = "card menu-card mb-3 p-3">
           <div className="row g-0 align-items-center">
               <div className ="col-auto">
                   <img src={`${process.env.PUBLIC_URL}/images/${imageName}`} alt = {title} width={150} height={150} />
               </div>
               <div class="col">
                   <div class="card-body ps-3">
                       <h2 className="card-title mb-1">{title}</h2>
                       <p className="card-text mb-2"> {description} </p>
                       <div className="d-flex justify-content-between align-items-center">
                           <p className="card-text fw-bold"> ${price} </p>
                           <div>
                               <button className="btn btn-primary btn-sm me-2" onClick={() => addToCart(item)}>⊕</button>
                               <span className="mx-2">{quantity}</span>
                               <button className="btn btn-secondary btn-sm" onClick={() => removeFromCart(item)}>⊖</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   );
};


export default MenuItem;


