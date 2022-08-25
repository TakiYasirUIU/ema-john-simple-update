import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const[products, setProducts] = useState([]);

    useEffect( () =>{
      fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts (data) )  
    },[])
    return (
        <div className='shop-container'>
            {/* For products part */}

            <div className="products-container">
                {
                    products.map(product => <Product key={product.id}
                    product={product}></Product> )
                }

                
            </div>

            {/* For cart Part */}
            <div className="cart-container">
                
            </div>
        </div>
    );
};

export default Shop;