import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {errorMsg: '', username: '', password: ''}

  onLoginForm = event => {
    event.preventDefault()
    this.getLoginStatus()
  }

  getLoginStatus = async () => {
    const {username, password} = this.state
    const userCredentials = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      history.replace('/')
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.setState({errorMsg: '', username: '', password: ''})
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg, password, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo-con">
            <img
              className="login-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>

          <form className="login-form-container" onSubmit={this.onLoginForm}>
            <label htmlFor="username">USERNAME</label>
            <input
              className="username-input"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsernameInput}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePasswordInput}
            />
            <button type="submit">Login</button>
            {errorMsg !== '' && <p className="error-msg">{`*${errorMsg}`}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
