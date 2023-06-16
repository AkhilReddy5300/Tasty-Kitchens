import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  removeAllItems: () => {},
})

export default CartContext
