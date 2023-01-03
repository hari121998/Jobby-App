import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import SkillItem from '../SkillItem'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const jobStatus = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemStatus: jobStatus.progress,
    similarJobs: [],
    jobItemDetails: {},
  }

  componentDidMount = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobItemStatus: jobStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsUrl, options)
    if (response.ok) {
      const jobData = await response.json()
      console.log(jobData)
      const jobsData = {
        jobDetails: jobData.job_details,
        similarJobs: jobData.similar_jobs,
      }
      const updatedSimilarJobs = jobsData.similarJobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        jobDescription: eachJob.job_description,
        employmentType: eachJob.employment_type,
        companyLogoUrl: eachJob.company_logo_url,
      }))
      const {jobDetails} = jobsData
      const updatedJobDetails = {
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }
      this.setState({
        jobItemStatus: jobStatus.success,
        similarJobs: updatedSimilarJobs,
        jobItemDetails: updatedJobDetails,
      })
    } else {
      this.setState({jobItemStatus: jobStatus.failure})
    }
  }

  onClickJobDetailsRetry = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetailsLoader = () => (
    <div className="job-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemFailureView = () => (
    <div className="failure-view-container failure-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="job-retry-btn"
        onClick={this.onClickJobDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsContainer = () => {
    const {jobItemDetails} = this.state
    const {
      jobDescription,
      packagePerAnnum,
      employmentType,
      companyLogoUrl,
      rating,
      title,
      lifeAtCompany,
      companyWebsiteUrl,
      location,
      skills,
    } = jobItemDetails
    return (
      <div className="job-item-details-card-con">
        <div className="title-logo-con">
          <img src={companyLogoUrl} alt="job details company logo" />
          <div className="title-rating-con">
            <h1 className="job-item-heading">{title}</h1>
            <div className="rating-con">
              <AiFillStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-icons-salary-con">
          <div className="icon-location-con">
            <div className="icon-location">
              <MdLocationOn />
              <p>{location}</p>
            </div>
            <div className="icon-location">
              <BsBriefcaseFill />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="salary-desc">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="visit-container">
          <h2>Description</h2>
          <a rel="noreferrer" href={companyWebsiteUrl} target="_blank">
            <h3>Visit</h3>
            <FiExternalLink size="20" />
          </a>
        </div>
        <p className="job-para">{jobDescription}</p>
        <div className="skill-list-container">
          <h2>Skills</h2>
          <ul>
            {skills.map(eachSkill => (
              <SkillItem key={eachSkill.name} skillItem={eachSkill} />
            ))}
          </ul>
        </div>
        <div className="life-at-company-con">
          <h2>Life at Company</h2>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {similarJobs} = this.state
    return (
      <>
        {this.renderJobItemDetailsContainer()}
        <SimilarJobs similarJobs={similarJobs} />
      </>
    )
  }

  renderJobItemDetailsSwitch = () => {
    const {jobItemStatus} = this.state

    switch (jobItemStatus) {
      case jobStatus.progress:
        return this.renderJobItemDetailsLoader()
      case jobStatus.failure:
        return this.renderJobItemFailureView()
      case jobStatus.success:
        return this.renderJobItemDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobItemDetailsSwitch()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
