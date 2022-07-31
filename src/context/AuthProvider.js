import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [presist, setPresist] = useState(JSON.parse(localStorage.getItem('presist')) || false);
    return <AuthContext.Provider value={{ auth, setAuth, presist, setPresist }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
