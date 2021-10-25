import {
    createContext,
    useContext,
    useReducer
} from 'react';

const AuthContext = createContext(null);

const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, dispatch] = useReducer(
        authReducer,
        initialAuth
    );

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider
                value={dispatch}
            >
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}

function authReducer(auth, action) {
    switch (action.type) {
        case 'added': {
            saveAuth(action.auth)
            return action.auth
        }
        case 'deleted':
            localStorage.removeItem('userInfo')
            return null
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const saveAuth = auth => localStorage.setItem('userInfo', JSON.stringify(auth))
const initialAuth = JSON.parse(localStorage.getItem('userInfo')) || null
