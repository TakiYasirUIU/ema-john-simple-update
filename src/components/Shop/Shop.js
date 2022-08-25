import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const[products, setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect( () =>{
      fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts (data) )  
    },[])
    
    // Add to cart event handler

    const handleAddToCart = (product) =>{
        console.log(product);
        // cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart)

    }

    return (
        <div className='shop-container'>
            {/* For products part */}

            <div className="products-container">
                {
                    products.map(product => <Product 
                    key={product.id}
                    product={product}
                    handleAddToCart = {handleAddToCart}
                    ></Product> )
                }

                
            </div>

            {/* For cart Part */}
            <div className="cart-container">
                <h3>Order Summary</h3>
                <p>Selected Item: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;