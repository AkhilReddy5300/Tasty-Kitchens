import {useState} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

/* const ratings = [
  4.1,
  4.2,
  4.3,
  4.4,
  4.5,
  4.6,
  4.7,
  4.8,
  4.9,
  5.0,
  3.1,
  3.5,
  2.5,
  3.8,
] */

const FoodItemDetailsItem = props => {
  const [current, setCurrent] = useState(false)
  const {item, quantity} = props
  const {name, imageUrl, id, cost} = item

  // const random = Math.ceil(Math.random() * ratings.length - 1)
  // const randomRating = ratings[random]

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, addCartItems} = value

        const changeControls = () => {
          addCartItems({...item, quantity})
          setCurrent(true)
        }

        return (
          <>
            <li className="fdDetails-li" data-testid="foodItem">
              <img src={imageUrl} alt="" className="fdDetails-li-img" />

              <div className="fdDetails-li-descriptionCont">
                <h1 className="fdDetails-li-name">{name}</h1>
                <div className="fdDetails-li-star-flex fdDetails-li-cost">
                  <FaRupeeSign />
                  <p>{cost}.00</p>
                </div>
                <div className="fdDetails-li-star-flex">
                  <AiFillStar size={20} color="#FFCC00" />
                  <p className="fdDetails-li-rating">4.8</p>
                </div>

                <button
                  type="button"
                  className="addBtn"
                  onClick={changeControls}
                >
                  {current ? 'Item Added' : 'ADD'}
                </button>
              </div>
            </li>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default FoodItemDetailsItem
