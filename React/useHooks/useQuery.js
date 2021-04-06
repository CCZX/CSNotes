const Context = createContext()

function Provider({store, children}) {
  return <Context.Provider value={store}>
    {children}
  </Context.Provider>
}

function useQuery(param) {
  const store = useContext(Context)

  const query = findParamFromStore(store, param)

  function setQuery(value) {
    
  }

  return [query, setQuery]
}

function findQueryFromStore(store, param) {
  
}
