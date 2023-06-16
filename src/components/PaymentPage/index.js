import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const PaymentPage = props => {
  const renderHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <>
      <Navbar />
      <div className="payment-bg">
        <img
          src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1683206657/Vector_1_ht1wdi.png"
          className="payment-img"
          alt=""
        />
        <h1 className="payment-header">Payment Successful</h1>
        <p className="payment-para">
          Thank you for ordering
          <br />
          Your payment is successfully completed.
        </p>
        <button
          className="payment-home-btn"
          type="button"
          onClick={renderHomePage}
        >
          Go To Home Page
        </button>
      </div>
    </>
  )
}

export default withRouter(PaymentPage)
