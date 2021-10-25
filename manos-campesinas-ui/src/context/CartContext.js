import {
    createContext,
    useContext,
    useReducer
} from 'react';

const CartContext = createContext(null);

const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(
        cartReducer,
        initialCart
    );

    return (
        <CartContext.Provider value={cart}>
            <CartDispatchContext.Provider
                value={dispatch}
            >
                {children}
            </CartDispatchContext.Provider>
        </CartContext.Provider>
    );
}

export function UseCart() {
    return useContext(CartContext);
}

export function useCartDispatch() {
    return useContext(CartDispatchContext);
}

function cartReducer(cart, action) {
    switch (action.type) {
        case 'added': {
            cart = [...cart, {
                ...action.product,
                quantity: 1
            }]
            saveCart(cart)
            return cart;
        }
        case 'plus': {

            const newCart = cart.map(p => {
                if (p.id === action.id) {
                    return {
                        ...p,
                        quantity: p.quantity + 1
                    }
                } else {
                    return p
                }
            })
            saveCart(newCart)
            return newCart
        }
        case 'deleted': {
            cart = cart.filter(t => t.id !== action.id);
            saveCart(cart)
            return cart
        }
        case 'clean': {
            saveCart([])
            return []
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart))

const initialCart = JSON.parse(localStorage.getItem('cart')) || []