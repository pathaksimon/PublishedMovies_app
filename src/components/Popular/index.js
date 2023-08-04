import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import Popularfailure from '../Popularfailure'
import './index.css'

const POPULAR = props => {
  const {first} = props
  const {posterPath, id, title} = first
  return (
    <Link to={`/movies/${id}`}>
      <li className="popularcard">
        <img src={posterPath} className="popularphoto" alt={title} />
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

class Popular extends Component {
  state = {
    popular: [],
    popularClicked: false,
    cancelClicked: false,
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.Popular()
  }

  Popular = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status: apiStatus.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updated = data.results.map(each => ({
        backDroppath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({popular: updated})
      this.setState({status: apiStatus.sucess})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  clickcross = () => {
    const {cancelClicked} = this.state
    this.setState({cancelClicked: true})
  }

  clickonpopular = () => {
    this.Popular()
  }

  crssacess = () => {
    const {cancelClicked} = this.state
    if (cancelClicked === true) {
      return 'newlyClicked'
    }
    return 'abovepopular'
  }

  sucess = () => {
    const {popular} = this.state
    return (
      <>
        <Header />

        <ul className="popularImagecontainer">
          {popular.map(each => (
            <POPULAR first={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failure = () => <Popularfailure clickonpopular={this.clickonpopular} />

  acess = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.sucess:
        return this.sucess()
      case apiStatus.inProgress:
        return this.loading()
      case apiStatus.failure:
        return this.failure()
      default:
        return null
    }
  }

  render() {
    const {popular, popularClicked} = this.state
    console.log(popularClicked)
    return (
      <>
        <div className="PopularHomeContainer">
          {this.acess()}
          <Footer />
        </div>
      </>
    )
  }
}

export default Popular
