import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Navbar = props => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const logoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartLength = cartList.length
        return (
          <>
            <nav className="nav">
              <ul className="nav-ul">
                <li className="home-li-1">
                  <Link to="/" className="link">
                    <img
                      src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1682694356/Vector_mbqumv.png"
                      alt="website logo"
                      className="home-logo"
                    />
                  </Link>
                  <h1 className="home-logo-header">Tasty Kitchens</h1>
                </li>
                <li className="home-li-2">
                  <div className="links-lg">
                    <Link to="/" className="link">
                      <button className="home-txt" type="button">
                        Home
                      </button>
                    </Link>
                    <Link to="/cart" className="link">
                      <button className="cart-txt" type="button">
                        Cart{' '}
                        <span>{cartLength > 0 ? `: ${cartLength}` : ''}</span>
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn-txt"
                      onClick={logoutBtn}
                    >
                      Logout
                    </button>
                  </div>
                  <button
                    className="toggle-btn"
                    type="button"
                    onClick={() => setNavbarOpen(prev => !prev)}
                  >
                    {navbarOpen ? (
                      <AiFillCloseCircle size={20} />
                    ) : (
                      <AiOutlineMenu size={20} />
                    )}
                  </button>
                </li>
              </ul>
              {navbarOpen ? (
                <ul className="links-sm">
                  <Link to="/" className="link">
                    <li className="home-txt">Home</li>
                  </Link>
                  <Link to="/cart" className="link">
                    <li className="cart-txt">Cart</li>
                  </Link>
                  <li>
                    <button
                      className="btn-txt"
                      type="button"
                      onClick={logoutBtn}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                ''
              )}
            </nav>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Navbar)
