import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {
                id: action.id,
                name: action.name,
                Qty: action.Qty,
                Size: action.Size,
                price: action.price,
                img: action.img
            },]
        case "REMOVE":
            let newarr = [...state]
            newarr.splice(action.index, 1)
            return newarr
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    arr[index] = { ...food, Qty: parseInt(action.Qty) + food.Qty, price: action.price + food.price }
                }
            })
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in Reducer")

    }
}
export const CartProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () =>
    useContext(CartStateContext);
export const useDispatchCart = () =>
    useContext(CartDispatchContext);

