import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const FoodItem = props => {
  const {item} = props
  const {imageUrl, name, userRating, id, cuisine} = item
  const {totalReviews, rating, ratingColor} = userRating

  return (
    <Link to={`/restaurant/${id}`} className="link-2">
      <li className="food-item-li" data-test id="restaurant-item">
        <img src={imageUrl} alt={id} className="food-item-img" />
        <div className="food-item-description">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cuisne">{cuisine}</p>
          <div className="star-flex">
            <AiFillStar size={16} color={ratingColor} />
            <p className="food-item-rating">{rating}</p>
            <p className="food-item-total-reviews">{`(${totalReviews} ratings)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default FoodItem
