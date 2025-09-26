import React, { useEffect, useState, useContext } from "react";
import axios from "axios";


export const CartContext = React.createContext();
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, [])

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://172.19.80.1:8080/cart/items", {
        params: {
          userId: "68d2ba1a9dbfcafe07c8dff7"
        }
      }
      );
      if (response?.status === 200 && response?.data?.status === true) {
        console.log("cartget", response)
        setCartItems(response.data.data);
      }
      else {
        alert(response.data.message || "No cart items found");
      }
    } catch (error) {
      alert('Network or server error, please try again later.');
    }
  }

  const addToCart = async item => {
    try {
      const response = await axios.post("http://172.19.80.1:8080/cart/add", null, {
        params: {
          userId: "68d2ba1a9dbfcafe07c8dff7",
          productId: item.id,
          quantity: item.quantity
        }
      });
      console.log("cart", response);
      setCartItems(prev => {
        const existingIndex = prev.findIndex(i => i.productId === response.data.data.productId);

        if (existingIndex >= 0) {
          const updatedItems = [...prev];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: response.data.data.quantity
          };
          return updatedItems;

        } else {
          return [...prev, response.data.data];
        }
      }
      );
    }
    catch (error) {
      console.error("Failed to sync cart:", error);
      alert("Could not update cart. Please try again.");
    }
  }

  const removeFromCart = async itemId => {
    try{
     await axios.delete("http://172.19.80.1:8080/cart/remove", {

          params: {  
            userId: "68d2ba1a9dbfcafe07c8dff7",
            productId: itemId
          }

        });
        await fetchCartItems();
      }
     catch (error) {
      console.error("Failed to remove:", error);
      alert("Could not update cart. Please try again.");
    }
  }

  const clearCart = async () => {
   try{
     await axios.delete("http://172.19.80.1:8080/cart/clear", {

          params: {  
            userId: "68d2ba1a9dbfcafe07c8dff7"
          }

        });
        setCartItems([]);
      }
     catch (error) {
      console.error("Failed to clear:", error);
      alert("Could not update cart. Please try again.");
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
export function useCart() {
  return useContext(CartContext)
}