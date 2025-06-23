import React, { createContext, useState, useContext } from 'react';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [featuredImages, setFeaturedImages] = useState([]);

  const value = {
    featuredImages,
    setFeaturedImages,
    // add other shared data here later
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
