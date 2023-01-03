import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const profileStatus = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {status: profileStatus.progress, profileAvatar: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({status: profileStatus.progress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    if (response.ok) {
      const profileData = await response.json()
      const profile = profileData.profile_details
      const updatedProfileDetails = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileAvatar: updatedProfileDetails,
        status: profileStatus.success,
      })
    } else {
      this.setState({status: profileStatus.failure, profileAvatar: {}})
    }
  }

  onClickRetryBtn = () => this.getProfileDetails()

  renderProfileDetails = () => {
    const {profileAvatar} = this.state
    const {profileImageUrl, name, shortBio} = profileAvatar
    return (
      <div className="bg-profile-details">
        <img src={profileImageUrl} alt="profile" />
        <h3 className="profile-name">{name}</h3>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <div className="retry-btn">
      <button type="button" onClick={this.onClickRetryBtn}>
        Retry
      </button>
    </div>
  )

  renderSwitchProfileDetails = () => {
    const {status} = this.state
    switch (status) {
      case profileStatus.progress:
        return this.renderLoader()
      case profileStatus.success:
        return this.renderProfileDetails()
      case profileStatus.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderSwitchProfileDetails()}</>
  }
}
export default Profile
