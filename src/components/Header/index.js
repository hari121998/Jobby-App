import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-con">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="nav-link-list-con">
        <Link to="/" className="header-link-item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="header-link-item">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" onClick={onClickLogoutBtn}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
