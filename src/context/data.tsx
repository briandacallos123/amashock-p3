import React, {useState, createContext, useContext, useCallback} from 'react'


const DataContextProvider = createContext({});

export const useDataContext = () => {
  return useContext(DataContextProvider)
}



const DataContext = ({children}) => {
  const [data, setData] = useState([]);

  const fillData = useCallback((d:any) => {
    setData(d)
  },[data])

  console.log(data,'dataaaaaaaaaaaaaaa')

  return (
   <DataContextProvider.Provider value={{fillData, data}}>
    {children}
   </DataContextProvider.Provider>
  )
}

export default DataContext