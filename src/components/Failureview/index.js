import './index.css'

const Failureview = props => {
  const {click} = props

  const tryagain = () => {
    click()
  }
  return (
    <div className="failureview">
      <img
        src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688396580/alert-triangle_fta4au.png"
        className="Failview"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={tryagain} className="trybutton">
        Try Again
      </button>
    </div>
  )
}

export default Failureview
