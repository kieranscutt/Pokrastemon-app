import React, {useState, useContext, createContext} from 'react'


//auth tokens
export const AuthContext = createContext()

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

//users pomodoro settings

const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({});
    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);

//users pokemon settings

const PokemonContext = createContext()

export const PokemonProvider = ({ children }) => {
    const [pokemon, setPokemon] = useState([]);
    return (
        <PokemonContext.Provider value={{pokemon, setPokemon}}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => useContext(PokemonContext);
