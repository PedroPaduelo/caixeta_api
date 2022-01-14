import { useState, useCallback, createContext } from 'react';


const TesteContex = createContext();

function TesteProvider({ children }) {

  const [values, setValues] = useState({});

  const handleChange = useCallback((event) => {

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

  },[values])



  return (
    <TesteContex.Provider value={{ 
      handleChange,
      values
    }}>
      {children}
    </TesteContex.Provider>
  );
}


export { TesteContex, TesteProvider };