import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
    showPassword: false,
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 120, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  changeName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  showPass = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {username, password, errorMsg, showError, showPassword} = this.state
    return (
      <>
        <div className="login-bg">
          <img
            src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1682747598/Rectangle_1457_sku0ce.png"
            alt="website login"
            className="login-sm-img"
          />
          <div className="login-card-respo">
            <div className="login-card">
              <img
                src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1682694356/Vector_mbqumv.png"
                alt="website logo"
                className="login-logo"
              />
              <h1 className="tasty-kitchen-txt">Tasty Kitchens</h1>
              <h1 className="login-txt">Login</h1>
              <form onSubmit={this.submitForm}>
                <label className="label" htmlFor="input1">
                  USERNAME
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={this.changeName}
                  className="input"
                  id="input1"
                  placeholder="rahul"
                />
                <label className="label" htmlFor="input2">
                  PASSWORD
                </label>
                <div className="password-cont">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={this.changePassword}
                    id="input2"
                    className="input2"
                    placeholder="rahul@2021"
                  />

                  <button
                    type="button"
                    className="eyeBtn"
                    onClick={this.showPass}
                  >
                    {showPassword ? (
                      <AiFillEye size="20" />
                    ) : (
                      <AiFillEyeInvisible size="20" />
                    )}
                  </button>
                </div>

                {showError && <p className="errorMsg">*{errorMsg}</p>}
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>
            </div>
          </div>

          <div className="login-lg-img-responsive">
            <img
              src="https://res.cloudinary.com/dc9rj7dy6/image/upload/v1682747586/Rectangle_1456_zbngbk.png"
              alt="website login"
              className="login-lg-img"
            />
          </div>
        </div>
      </>
    )
  }
}
export default Login
