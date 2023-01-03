import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobsItem from '../JobsItem'
import Profile from '../Profile'
import EmploymentList from '../EmploymentList'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const jobStatus = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    salaryRange: '',
    employmentValue: [],
    searchValue: '',
    listStatus: jobStatus.progress,
    jobsListData: [],
    total: 0,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({listStatus: jobStatus.progress})
    const {searchValue, employmentValue, salaryRange} = this.state
    const typeValue = employmentValue.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeValue}&minimum_package=${salaryRange}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(jobApiUrl, options)
    if (response.ok) {
      const jobsData = await response.json()
      const totalList = jobsData.total
      const updatedJobsData = jobsData.jobs.map(eachItem => ({
        title: eachItem.title,
        id: eachItem.id,
        location: eachItem.location,
        rating: eachItem.rating,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
      }))
      this.setState({
        jobsListData: updatedJobsData,
        listStatus: jobStatus.success,
        total: totalList,
      })
    } else {
      this.setState({
        listStatus: jobStatus.failure,
      })
    }
  }

  employmentInsertValue = string => {
    this.setState(
      prevState => ({employmentValue: [...prevState.employmentValue, string]}),
      this.getJobsData,
    )
  }

  employmentDeleteValue = string => {
    this.setState(prevState => {
      const filterValue = prevState.employmentValue.filter(
        eachValue => eachValue !== string,
      )
      return {employmentValue: filterValue}
    }, this.getJobsData)
  }

  onChangeSalaryValue = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsData)
  }

  onClickJobRetry = () => this.getJobsData()

  onSubmitSearchValue = event => {
    event.preventDefault()
    this.getJobsData()
  }

  searchBtnClicked = () => {
    this.onSubmitSearchValue()
  }

  onChangeSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  renderProfileContainer = () => (
    <div className="profile-container">
      <Profile />
      <hr className="line" />
      <EmploymentList
        employmentInsertValue={this.employmentInsertValue}
        employmentDeleteValue={this.employmentDeleteValue}
        employmentList={employmentTypesList}
      />
      <hr className="line" />
      <h4 className="salary-range-heading">Salary Range</h4>
      <ul className="salary-range-list-con">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId}>
            <input
              id={eachItem.salaryRangeId}
              type="radio"
              name="salary"
              value={eachItem.salaryRangeId}
              onChange={this.onChangeSalaryValue}
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderJobItemList = () => {
    const {jobsListData, total} = this.state
    if (total === 0) {
      return (
        <div className="failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found </h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul className="job-list-container">
        {jobsListData.map(eachJob => (
          <JobsItem key={eachJob.id} jobItem={eachJob} />
        ))}
      </ul>
    )
  }

  renderJobListLoader = () => (
    <div className="job-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="job-retry-btn"
        onClick={this.onClickJobRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsListSwitch = () => {
    const {listStatus} = this.state
    switch (listStatus) {
      case jobStatus.success:
        return this.renderJobItemList()
      case jobStatus.progress:
        return this.renderJobListLoader()
      case jobStatus.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchValue} = this.state

    return (
      <>
        <Header />
        <div className="jobs-profile-container">
          {this.renderProfileContainer()}
          <div className="jobs-profile-filter-container">
            <div>
              <form
                className="search-form-container"
                onSubmit={this.onSubmitSearchValue}
              >
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  value={searchValue}
                />
                <button
                  type="button"
                  onClick={this.searchBtnClicked}
                  testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </form>
              {this.renderJobsListSwitch()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
