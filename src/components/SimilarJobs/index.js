import SimilarJobItems from '../SimilarJobItems'
import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props

  return (
    <div className="similar-jobs-con">
      <h2>Similar Jobs</h2>
      <ul>
        {similarJobs.map(eachJob => (
          <SimilarJobItems similarJobItem={eachJob} key={eachJob.id} />
        ))}
      </ul>
    </div>
  )
}
export default SimilarJobs
