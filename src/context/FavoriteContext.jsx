import React from 'react'
import { createContext } from "react"; 
import { useState } from 'react';

const FavoriteContext = createContext(null);
export const CurrentButtonContext = createContext(null);

function FavoriteProvider({ children, movie }) {
  const [currentButton, setCurrentButton] = useState('Add to Favorite');
  return (
    <FavoriteContext.Provider value={movie}>
      <CurrentButtonContext.Provider value={{
        currentButton,
        setCurrentButton
      }}>
        {children}
      </CurrentButtonContext.Provider>
    </FavoriteContext.Provider>
  )
}

export default FavoriteProvider