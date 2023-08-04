import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactSlick from '../Trending'
import Failureview from '../Failureview'
import './index.css'

const ReactSlick1 = props => {
  const {first} = props
  const {posterPath, id, title} = first
  return (
    <Link to={`/movies/${id}`}>
      <li className="lista">
        <img src={posterPath} className="imageoflist " alt={title} />
      </li>
    </Link>
  )
}

const apiStatus = {
  initial: 'INITIAL',
  sucess: 'SUCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class TopRated extends Component {
  state = {
    Toprated: [],
    status3: apiStatus.initial,
  }

  componentDidMount() {
    this.getProducts3()
  }

  getProducts3 = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status3: apiStatus.inProgress})
    const apiUrltrend = 'https://apis.ccbp.in/movies-app/top-rated-movies'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const responseTrend = await fetch(apiUrltrend, options)

    if (responseTrend.ok === true) {
      const dataTrend = await responseTrend.json()
      const updatedTrend = dataTrend.results.map(eachtrend => ({
        id: eachtrend.id,
        backdropPath: eachtrend.backdrop_path,
        overview: eachtrend.overview,
        posterPath: eachtrend.poster_path,
        title: eachtrend.title,
      }))

      const newestrandy = updatedTrend.sort(() => Math.random() - 0.5)
      const splitted = newestrandy.slice(0, 2)
      this.setState({Toprated: splitted})
      this.setState({status3: apiStatus.sucess})
    } else {
      this.setState({status3: apiStatus.failure})
    }
  }

  sucess4 = () => {
    const {Toprated} = this.state

    return (
      <ul className="toppy">
        {Toprated.map(each1 => (
          <ReactSlick1 first={each1} key={each1.id} />
        ))}
      </ul>
    )
  }

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  click = () => {
    this.getProducts3()
  }

  failure = () => <Failureview click={this.click} />

  centeracess2 = () => {
    const {status3} = this.state
    switch (status3) {
      case apiStatus.sucess:
        return this.sucess4()
      case apiStatus.failure:
        return this.failure()
      case apiStatus.inProgress:
        return this.loading()
      default:
        return null
    }
  }

  render() {
    const {status3, Toprated} = this.state
    console.log(Toprated)
    return <>{this.centeracess2()}</>
  }
}

export default TopRated
