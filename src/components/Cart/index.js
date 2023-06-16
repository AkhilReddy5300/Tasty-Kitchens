import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllItems} = value

      const cartLength = cartList.length === 0

      return (
        <div className="cart-responsive">
          <Navbar />
          {cartLength ? (
            <div className="no-items-cont">
              <img
                src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1683206648/Layer_2_hqzbzy.png"
                alt="empty cart"
                className="no-items-image"
              />
              <h1 className="no-items-header">No Order Yet!</h1>
              <p className="no-items-para">
                Your cart is empty. Add something from the menu.
              </p>
              <Link to="/" className="link">
                <button type="button" className="order-now">
                  Order Now
                </button>
              </Link>
            </div>
          ) : (
            <div className="cart-items-responsive">
              <ul className="cart-items-ul">
                <div className="cart-logo-flex">
                  <img
                    src="https://pngtree.com/so/foodie"
                    alt=""
                    className="cart-logo"
                  />

                  <button
                    className="my-cart-cont"
                    type="button"
                    onClick={removeAllItems}
                  >
                    Remove All
                  </button>
                </div>
                <div className="cart-item-headers">
                  <p className="cart-item-headers-txt">Item</p>
                  <p className="cart-item-headers-txt">Quantity</p>
                  <p className="cart-item-headers-txt">Price</p>
                </div>
                {cartList.map(each => (
                  <CartItem key={each.id} item={each} />
                ))}
                <hr />
                <div className="cart-summary-responsive">
                  <CartSummary />
                </div>
              </ul>
            </div>
          )}
          <Footer />
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
