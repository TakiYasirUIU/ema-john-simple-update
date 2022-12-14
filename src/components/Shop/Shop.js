import React, { useEffect, useState } from 'react';
import {addToDb, getStoredCart} from '../../utilities/fakedb'; 
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const[products, setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect( () =>{
      console.log('product load fist before fetch')
      fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts (data)); 
    },[]);

    // useEffect(() =>{
    //     console.log('local storage first line',products)
    //     const storedCart = getStoredCart();
    //     const savedCart = [];
    //     for(const id in storedCart){
    //         const addedProduct = products.find(product=>product.id === id);
    //         if(addedProduct){
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             savedCart.push(addedProduct);
                
    //         }
    //         // console.log(addedProduct);
    //     }
    //     // console.log('local storage finished')
    //     setCart(savedCart);
    // },[products])
    useEffect (() =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id );
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity =quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart)
    },[products])

    
    // Add to cart event handler

    const handleAddToCart = (selectedProduct) =>{
        // console.log(selectedProduct);
        // cart.push(product);
        let newCart = []
        const exits = cart.find(product => product.id === selectedProduct);
        if(!exits){
            selectedProduct.quantity = 1
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exits.quantity = exits.quantity + 1;
            newCart = [...rest,exits]
        }
        setCart(newCart)
        addToDb(selectedProduct.id)
    

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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;