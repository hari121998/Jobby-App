import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItems = props => {
  const {similarJobItem} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    employmentType,
  } = similarJobItem
  return (
    <li className="similar-job-item-con">
      <div className="title-logo-con">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div className="title-rating-con">
          <h1 className="job-item-heading">{title}</h1>
          <div className="rating-con">
            <AiFillStar className="star-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h3>Description</h3>
      <p className="job-para">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobItems
