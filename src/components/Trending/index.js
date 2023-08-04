import {Link} from 'react-router-dom'
import './index.css'

const ReactSlick = props => {
  const {first} = props
  const {posterPath, id, title} = first

  return (
    <Link to={`/movies/${id}`}>
      <div className="imagecard">
        <img src={posterPath} className="image" alt={title} />
      </div>
    </Link>
  )
}

export default ReactSlick
