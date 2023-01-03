import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <h1>
        Find The Job That
        <br /> Fits Your Life
      </h1>
      <p>
        Millions of people are searching for jobs, salary
        <br /> information, company reviews.Find the job that fits your
        <br />
        abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button">Find Jobs</button>
      </Link>
    </div>
  </>
)

export default Home
