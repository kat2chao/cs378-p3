import React, { useState } from 'react';
import './App.css';
import MenuItem from './components/MenuItem';


import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.


// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
const menuItems = [
 {
   id: 1,
   title: 'Gyoza',
   description: 'Japanese dumplings',
   imageName: 'gyoza.png',
   price: 5.99,
 },
 {
   id: 2,
   title: 'Sushi',
   description: 'Japanese rice rolls',
   imageName: 'sushi.png',
   price: 6.99,
 },
 {
   id: 3,
   title: 'Ramen',
   description: 'Japanese noodle soup',
   imageName: 'ramen.png',
   price: 7.99,
 },
 {
   id: 4,
   title: 'Matcha Cake',
   description: 'Japanese green tea cake',
   imageName: 'matcha-cake.png',
   price: 4.99,
 },
 {
   id: 5,
   title: 'Mochi',
   description: 'Japanese rice cake',
   imageName: 'mochi.png',
   price: 3.99,
 },
 {
   id: 6,
   title: 'Yakitori',
   description: 'Japanese skewered chicken',
   imageName: 'yakitori.png',
   price: 2.99,
 },
 {
   id: 7,
   title: 'Takoyaki',
   description: 'Japanese octopus balls',
   imageName: 'takoyaki.png',
   price: 5.99,
 },
 {
   id: 8,
   title: 'Sashimi',
   description: 'Japanese raw fish',
   imageName: 'sashimi.png',
   price: 8.99,
 },
 {
   id: 9,
   title: 'Okonomiyaki',
   description: 'Japanese savory pancake',
   imageName: 'okonomiyaki.png',
   price: 6.99,
 },
 {
   id: 10,
   title: 'Katsu Curry',
   description: 'Japanese curry with fried pork',
   imageName: 'katsu-curry.png',
   price: 9.99,
 }
];




function App() {


 const[cart, setCart] = useState({});
 const [total, setTotal] = useState(0);


 const addToCart = (item) => {
   const newCart = {...cart};
   if(newCart[item.id]) {
     newCart[item.id].quantity += 1;
   } else {
     newCart[item.id] = { ...item, quantity: 1};
   }
   setCart(newCart);
   setTotal(total + item.price);
 };


 const removeFromCart = (item) => {
   const newCart = {...cart};
   if (newCart[item.id] && newCart[item.id].quantity > 0){
     newCart[item.id].quantity -= 1;
     setTotal(total - item.price);
     if(newCart[item.id].quantity === 0) {
       delete newCart[item.id];
     }
   }
   setCart(newCart);
 };


 const clearCart = () => {
   setCart({});
   setTotal(0);
 };


 const placeOrder = () => {
   if (total === 0) {
     alert("No items in cart");
     return;
   }
   let orderSummary = "Order placed: \n";
   for(const itemId in cart) {
     const item = cart[itemId];
     orderSummary += `${item.title} x ${item.quantity} \n`;
   }
   alert(orderSummary);
   clearCart();
 };


 return (
   <div>
     <img src = "https://images-platform.99static.com//RW9-kVTp4GR23eftyg50vq5eefw=/255x59:945x748/fit-in/500x500/99designs-contests-attachments/85/85356/attachment_85356234" alt = "sushi logo" class = "logo"></img>
     <div className="text-center mb-4">
       <h4> Authentic Japanese cuisine </h4>
       <h2> Your culinary adventure awaits! </h2>
     </div>
     <div className="menu">
       {/* Display menu items dynamicaly here by iterating over the provided menuItems */}
      {menuItems.map(item => (
       // <div key = {item.id}>
       <MenuItem index={item.id}
         item = {item}
         title={item.title}
         description={item.description}
         price={item.price}
         imageName={item.imageName}
         cart={cart}
         addToCart={addToCart}
         removeFromCart={removeFromCart}
       />
      ))}
     </div>
     <div className="cart d-flex justify-content-between align-items-center mt-4">
       <h3> Subtotal: ${total.toFixed(2)}</h3>
       <div>
       <button className = "order-btn btn-primary btn-sm me-2" onClick = {placeOrder}>Order</button>
       <button className = "clear-btn btn-secondary btn-sm" onClick = {clearCart}>Clear all</button>
       </div>
     </div>
   </div>
 );
}


export default App;



