import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-bg">
    <div className="footer-cont">
      <div className="footer-logo-flex">
        <img
          src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1682853405/Group_7420_l8it0w.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-header">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food. <br />
        Contact us on
      </p>
      <div className="footer-logo-flex">
        <button
          data-test
          id="pintrest-social-icon"
          type="button"
          className="footer-btn"
        >
          <FaPinterestSquare size={20} />
        </button>
        <button
          data-test
          id="instagram-social-icon"
          type="button"
          className="footer-btn"
        >
          <FaInstagram size={20} />
        </button>
        <button
          data-test
          id="twitter-social-icon"
          type="button"
          className="footer-btn"
        >
          <FaTwitter size={20} />
        </button>
        <button
          data-test
          id="facebook-social-icon"
          type="button"
          className="footer-btn"
        >
          <FaFacebookSquare size={20} />
        </button>
      </div>
    </div>
  </div>
)
export default Footer
