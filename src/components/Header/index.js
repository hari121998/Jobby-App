import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {HiHome} from 'react-icons/hi'
import {BsBriefcaseFill} from 'react-icons/bs'
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

      <ul className="nav-link-list-con large-nav">
        <Link to="/" className="header-link-item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="header-link-item">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" className="large-nav" onClick={onClickLogoutBtn}>
        Logout
      </button>
      <ul className="nav-link-list-con small-device-nav-icons">
        <Link to="/" className="header-link-item">
          <li>
            <HiHome />
          </li>
        </Link>
        <Link to="/jobs" className="header-link-item">
          <li>
            <BsBriefcaseFill />
          </li>
        </Link>
        <li>
          <FiLogOut size="20" onClick={onClickLogoutBtn} />
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
