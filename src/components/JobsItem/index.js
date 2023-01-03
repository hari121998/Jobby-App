import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsItem = props => {
  const {jobItem} = props
  const {
    id,
    jobDescription,
    packagePerAnnum,
    employmentType,
    companyLogoUrl,
    rating,
    title,
    location,
  } = jobItem
  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      <li className="job-item-container">
        <div>
          <div className="title-logo-con">
            <img src={companyLogoUrl} alt="company logo" />
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
          <h3>Description</h3>
          <p className="job-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsItem
