import './index.css'

const SkillItem = props => {
  const {skillItem} = props
  const {imageUrl, name} = skillItem
  return (
    <li className="skill-item-con">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
    </li>
  )
}

export default SkillItem
