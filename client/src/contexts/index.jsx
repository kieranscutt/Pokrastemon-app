import React, {useState, useContext, createContext} from 'react'

//auth tokens
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

//users keys

const KeysContext = createContext()

export const KeysProvider = ({ children }) => {
    const [keys, setKeys] = useState(0);
    return (
        <KeysContext.Provider value={{keys, setKeys }}>
            {children}
        </KeysContext.Provider>
    );
};

export const useKeys = () => useContext(KeysContext);
