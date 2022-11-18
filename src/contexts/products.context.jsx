import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json';

//Whenever using context we need the conttext value as well as the provider
export const ProductsContext = createContext({
    products: [], //here products is initialized
});

//We know we want to store an array of products
//products, setProducts are what we need from useState, then we pass PRODUCTS
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products}; // we export out the value as an object, to pass on the value in Provider
       return ( //we will need to put it in the appropriate place, index.js
        <ProductsContext.Provider value={value}>
        {children}
        </ProductsContext.Provider>
    )
}