import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const FavoritesContext = React.createContext();
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, [])

  const getFavorites = async () => {
    try {
      const response = await axios.get("http://172.19.80.1:8080/favorites?userId=68d2ba1a9dbfcafe07c8dff7");
      if (response?.status === 200 && response?.data?.status === true) {
        setFavorites(response.data.data);
      }
      else {
        alert(response.data.message || "No Favorites found");
      }
    } catch (error) {
      alert('Network or server error, please try again later.');
    }
  }


  const toggleFavorite = async (productId) => {
    try {
      let existingFavorite = favorites?.find(fav => fav && fav.productId === productId);
      if (existingFavorite) {
        // Remove from backend
        await axios.delete("http://172.19.80.1:8080/favorites", {

          data: {  
            userId: existingFavorite.userId,
            productId: existingFavorite.productId
          }

        });
        setFavorites(prev => prev.filter(fav => fav && fav.productId !== productId));
      } else {
        // Add to backend
        const response = await axios.post(`http://172.19.80.1:8080/favorites`, {
          userId: "68d2ba1a9dbfcafe07c8dff7",
          productId: productId
        });
        setFavorites(prev => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error("Failed to sync favorite:", error);
      alert("Could not update favorites. Please try again.");
    }
  };


  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
export function useFavorites() {
  return useContext(FavoritesContext)
}