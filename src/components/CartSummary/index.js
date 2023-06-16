import {withRouter} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let total = 0
      cartList.forEach(each => {
        total += each.cost * each.quantity
      })

      const renderPayment = () => {
        const {history} = props
        history.replace('./payment-page')
      }
      return (
        <>
          <div className="total-flex" data-testid="total-price">
            <h1 className="cartSummaryOrderTotal">Order Total:</h1>

            <div className="cartSummaryTotalCount">
              <BiRupee size={20} />
              <span>{total}.00</span>
            </div>
          </div>

          <div className="Place-Order-flex">
            <button
              type="button"
              className="Place-Order"
              onClick={renderPayment}
            >
              Place Order
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default withRouter(CartSummary)
