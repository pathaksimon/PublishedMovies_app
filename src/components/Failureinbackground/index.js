import './index.css'

const Failureinbackground = props => {
  const {clickinbackground} = props

  const tryagain = () => {
    clickinbackground()
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

export default Failureinbackground
