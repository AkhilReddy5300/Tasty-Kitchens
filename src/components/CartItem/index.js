import {AiOutlineMinus, AiOutlinePlus, AiOutlineClose} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {item} = props
  const {name, cost, imageUrl, id, quantity} = item

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const incrementItem = () => {
          incrementCartItemQuantity(id)
        }

        const decrementItem = () => {
          decrementCartItemQuantity(id)
        }

        const removeItem = () => {
          removeCartItem(id)
        }

        return (
          <li className="cart-items-li" data-test id="cartItem">
            <img src={imageUrl} alt={name} className="cart-items-image" />
            <div className="cart-items-description">
              <h1 className="cart-items-header">{name}</h1>
              <div className="controls-responsive">
                <button
                  type="button"
                  className="controlBtn"
                  onClick={decrementItem}
                  data-test
                  id="decrement-quantity"
                >
                  <AiOutlineMinus size={12} />
                </button>
                <p className="quantity" data-test id="item-quantity">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="controlBtn"
                  onClick={incrementItem}
                  data-test
                  id="increment-quantity"
                >
                  <AiOutlinePlus size={12} />
                </button>
              </div>
              <div className="cart-item-cost-cont">
                <BiRupee size={20} color="#ffa412" />
                <h1 className="cart-item-cost">{cost}.00</h1>
              </div>
            </div>
            <button type="button" className="closeBtn" onClick={removeItem}>
              <AiOutlineClose size={16} />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItem
