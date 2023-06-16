import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FoodItemDetailsItem from '../FoodItemDetailsItem'
import './index.css'

class FoodItemDetails extends Component {
  state = {foodItemDetails: {}, foodItems: [], quantity: 1}

  componentDidMount() {
    this.getFoodItemDetailsData()
  }

  getFormattedData = item => ({
    name: item.name,
    cost: item.cost,
    foodType: item.food_type,
    imageUrl: item.image_url,
    id: item.id,
  })

  getFoodItemDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
      }

      const foodItemsData = data.food_items.map(each =>
        this.getFormattedData(each),
      )

      this.setState({foodItemDetails: updatedData, foodItems: foodItemsData})
    }
  }

  render() {
    const {foodItemDetails, foodItems, quantity} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      opensAt,
      location,
      itemsCount,
    } = foodItemDetails
    // console.log(foodItems)

    return (
      <>
        <div className="fdDetails-responsive">
          <div className="fdDetails-nav">
            <Navbar />
          </div>
          <div className="fdDetails-bgImg">
            <img
              src={imageUrl}
              className="fdDetails-bannerImg"
              alt="restaurant"
            />
            <div className="fdDetails-bannerDescriptionCont">
              <h1 className="bannerHeader">{name}</h1>
              <p className="bannerLocation">{location}</p>
              <div className="bannerRatingCont">
                <div>
                  <div className="bannerStarFlex">
                    <AiFillStar size={18} color="#ffffff" />
                    <span className="bannerRating">{rating}</span>
                  </div>
                  <p className="bannerReviews">{reviewsCount}+Ratings</p>
                </div>
                <p className="vertical-line">
                  <span className="span">.</span>
                </p>

                <div>
                  <div className="bannerStarFlex">
                    <FaRupeeSign size={14} color="#ffffff" />
                    <span className="bannerRating">{costForTwo}</span>
                  </div>
                  <p className="bannerReviews">Cost for two</p>
                </div>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1683050860/funny-zebra-3d-illustration_vnerig.jpg"
              className="bannerLogo"
              alt=""
            />
          </div>

          <ul className="fdDetails-ul">
            {foodItems.map(each => (
              <FoodItemDetailsItem
                key={each.id}
                item={each}
                quantity={quantity}
                toggleControls={this.toggleControls}
              />
            ))}
          </ul>
          <Footer />
        </div>
      </>
    )
  }
}

export default FoodItemDetails
