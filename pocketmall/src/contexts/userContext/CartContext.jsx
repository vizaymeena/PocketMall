
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext()

export function CartProvider({ children }) {
    let [cartItems, setCartItem] = useState([])

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart"))
        if (cart) {
            setCartItem(cart)
        }
    }, [cartItems.length])

    const createCart = (cart) => {
        if (cart) {
            localStorage.setItem("cart", JSON.stringify(cart))
            return true
        }
        else {
            return false
        }
    }

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        return cart ? cart : []
    }

    const saveCart = (item) => {
        let cart = getCart()
        let existing = cart.find(product => product.id == item.id)
        if (existing) {
            existing.quantity += 1
        }
        else {
            cart.push({
                ...item,
                quantity: 1
            })
        }
        let isdone = createCart(cart)
        if (!isdone) return alert("adding product in cart goes failed")
        alert("product added into the cart")
    }

    const removeCart = (id) => {
        let cart = getCart()
        let updated = cart.filter((p) => p.id !== id)
        let isdone = createCart(updated);

        if (!isdone) return alert("remove product from cart goes failed")
        alert("product successfully removed from cart")
    }



    return (
        <CartContext.Provider value={{ getCart, saveCart, removeCart, cartItems }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}
