import React, { useState, createContext } from "react";
import { sampleData } from "views/GenerateTemplate";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [data, setData] = useState(sampleData);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
