import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {MdOutlineSort, MdFirstPage, MdLastPage} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'

import Navbar from '../Navbar'
import FoodItem from '../FoodItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  successOne: 'SUCCESS_1',
  successTwo: 'SUCCESS_2',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    carouselList: [],
    foodItemsList: [],
    activeId: sortByOptions[0].value,
    activePage: 1,
    limit: 9,
    searchInput: '',
  }

  componentDidMount() {
    this.getCarouselData()
    this.getFoodItemsData()
  }

  changeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchItems = () => {
    this.getFoodItemsData()
  }

  getUserRating = user => ({
    ratingText: user.rating_text,
    ratingColor: user.rating_color,
    totalReviews: user.total_reviews,
    rating: user.rating,
  })

  getFoodItemsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeId, activePage, limit, searchInput} = this.state
    const offset = (activePage - 1) * limit

    const url = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${activeId}&offset=${offset}&limit=${limit}'`
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
    const formattedData = data.restaurants.map(each => ({
      hasOnlineDelivery: each.has_online_delivery,
      name: each.name,
      hasTableBooking: each.has_table_booking,
      isDeliveringNow: each.is_delivering_now,
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      imageUrl: each.image_url,
      id: each.id,
      menuType: each.menu_type,
      location: each.location,
      opensAt: each.opens_at,
      groupByTime: each.group_by_time,
      userRating: this.getUserRating(each.user_rating),
    }))

    this.setState({
      foodItemsList: formattedData,
      apiStatus: apiStatusConstants.successTwo,
    })
  }

  changeActiveID = event => {
    this.setState({activeId: event.target.value}, this.getFoodItemsData)
  }

  onIncrease = () => {
    const {activePage} = this.state
    this.setState(
      prevState => ({activePage: prevState.activePage + 1}),
      this.getFoodItemsData,
    )
  }

  onDecrease = () => {
    const {activePage} = this.state
    this.setState(
      prevState => ({activePage: prevState.activePage - 1}),
      this.getFoodItemsData,
    )
  }

  getCarouselData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const data = await response.json()
    // console.log(data)
    const updatedData = data.offers.map(each => ({
      imageUrl: each.image_url,
      id: each.id,
    }))
    this.setState({
      carouselList: updatedData,
      apiStatus: apiStatusConstants.successOne,
    })
  }

  render() {
    const {
      carouselList,
      activeId,
      foodItemsList,
      activePage,
      searchInput,
    } = this.state
    // console.log(foodItemsList)
    const settings = {
      dots: true,
    }

    const filteredItems = foodItemsList.filter(each =>
      each.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <>
        <div className="home-responsive">
          <div className="frame-cont">
            <Navbar />
            <Slider {...settings}>
              {carouselList.map(each => (
                <div>
                  <img src={each.imageUrl} className="frame-sm" alt="offer" />
                </div>
              ))}
            </Slider>
            <h1 className="popular-restaurants">Popular Restaurants</h1>
            <p className="popular-para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="filter-cont">
              <div className="search-cont">
                <input
                  type="search"
                  className="input-search"
                  placeholder="Search For Restaurent"
                  value={searchInput}
                  onChange={this.changeInput}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.searchItems}
                >
                  <AiOutlineSearch />
                </button>
              </div>
              <div className="sort-display">
                <div className="sort-flex">
                  <MdOutlineSort size={20} />
                  <p className="sort-by">Sort by</p>
                  <select
                    value={activeId}
                    className="selectEl"
                    onChange={this.changeActiveID}
                  >
                    {sortByOptions.map(each => (
                      <option
                        value={each.value}
                        key={each.id}
                        className="optionEl"
                      >
                        {each.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <ul className="food-item-ul">
              {filteredItems.map(each => (
                <FoodItem key={each.id} item={each} />
              ))}
            </ul>
            <div className="pagnition-cont">
              <button
                type="button"
                onClick={this.onDecrease}
                data-testid="pagination-left-button"
                className="page-btn"
              >
                <MdFirstPage size={20} />
              </button>
              <p className="page-numbers" data-test id="active-page-number">
                {activePage} of 4
              </p>
              <button
                type="button"
                onClick={this.onIncrease}
                data-testid="pagination-right-button"
                className="page-btn"
              >
                <MdLastPage size={20} />
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
