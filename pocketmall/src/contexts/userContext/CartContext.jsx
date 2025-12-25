import { createContext, useContext, useEffect, useState } from "react"

export let CartContext = createContext()

export function CartProvider({ children }) {

  let [cartItems, setCartItems] = useState(() => {
    try {
      let stored = localStorage.getItem("cart")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  let saveCart = (item) => {
    setCartItems(prev => {
      let existing = prev.find(p =>
        p.id === item.id &&
        p.size === item.size &&
        p.color === item.color
      )

      if (existing) {
        return prev.map(p =>
          p.id === item.id &&
          p.size === item.size &&
          p.color === item.color
            ? {
                ...p,
                quantity: p.quantity + (item.quantity ?? 1),
                totalPrice:
                  (p.quantity + (item.quantity ?? 1)) * p.price
              }
            : p
        )
      }

      return [
        ...prev,
        {
          ...item,
          quantity: item.quantity ?? 1,
          totalPrice: (item.quantity ?? 1) * item.price
        }
      ]
    })
  }

  let removeCart = (id, size, color) => {
    setCartItems(prev =>
      prev.filter(
        p => !(p.id === id && p.size === size && p.color === color)
      )
    )
  }

  return (
    <CartContext.Provider value={{ cartItems, saveCart, removeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export let useCart = () => useContext(CartContext)
