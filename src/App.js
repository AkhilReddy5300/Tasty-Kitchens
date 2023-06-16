import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import PaymentPage from './components/PaymentPage'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import FoodItemDetails from './components/FoodItemDetails'
import './App.css'
// import Navbar from './components/Navbar'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: []}

  addCartItems = product => {
    const {cartList} = this.state
    const findItem = cartList.find(each => each.id === product.id)
    if (findItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === findItem.id) {
            const update = each.quantity + product.quantity
            return {...each, quantity: update}
          }
          return each
          // localStorage.setItem('cartData', each)
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterItems = cartList.filter(each => each.id !== id)
    this.setState({cartList: filterItems})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          const update = each.quantity + 1
          return {...each, quantity: update}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.quantity === 1) {
          return {...each, quantity: 1}
        }
        if (each.id === id) {
          const update = each.quantity - 1
          return {...each, quantity: update}
        }
        return each
      }),
    }))
  }

  removeAllItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    const getcartData = localStorage.getItem('cartData')
    const parsedData = JSON.parse(getcartData)
    // console.log(parseData)
    // console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList: parsedData,
          addCartItems: this.addCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          removeAllItems: this.removeAllItems,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={FoodItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/payment-page"
              component={PaymentPage}
            />
            <Route exact path="/bad-path" component={NotFound} />
            <Redirect to="/bad-path" />
          </Switch>
        </>
      </CartContext.Provider>
    )
  }
}
export default App
