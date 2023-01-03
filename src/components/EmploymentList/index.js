import './index.css'

const EmploymentList = props => {
  const {employmentList, employmentInsertValue, employmentDeleteValue} = props
  const onCheckValue = event => {
    const isChecked = event.target.checked
    const checkValue = event.target.value
    if (isChecked) {
      employmentInsertValue(checkValue)
    } else {
      employmentDeleteValue(checkValue)
    }
  }

  return (
    <div className="employment-con">
      <h4>Type of Employment</h4>
      <ul className="employment-list-con">
        {employmentList.map(eachItem => (
          <li key={eachItem.employmentTypeId}>
            <input
              id={eachItem.employmentTypeId}
              type="checkbox"
              value={eachItem.employmentTypeId}
              onChange={onCheckValue}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default EmploymentList
