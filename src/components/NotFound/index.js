import {withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const renderNotFound = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-cont">
      <img
        src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1683206665/Layer_2_1_xhlbqu.png"
        className="not-found-img"
        alt="not found"
      />
      <h1 className="not-found-header">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>

      <button className="not-found-btn" type="button" onClick={renderNotFound}>
        Home Page
      </button>
    </div>
  )
}
export default withRouter(NotFound)
