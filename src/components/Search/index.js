import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Failureview from '../Failureview'
import './index.css'

const MOVIES = props => {
  const {first} = props
  const {posterPath, id, title} = first
  return (
    <Link to={`/movies/${id}`}>
      <li className="lista12">
        <img src={posterPath} className="searchedimage" alt={title} />
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

class Search extends Component {
  state = {
    find: '',
    newfind: '',
    moviesList: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {newfind} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status: apiStatus.inProgress})
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${newfind}`
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
        id: each.id,
        title: each.titanic,
        posterPath: each.poster_path,
        backdrop: each.backdrop_path,
      }))
      this.setState({moviesList: updated})
      this.setState({status: apiStatus.sucess})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  changing = event => {
    this.setState({find: event.target.value})
  }

  clicking = () => {
    const {newfind, find} = this.state
    this.setState({newfind: find}, this.getProducts)
  }

  Notfound = () => {
    const {newfind} = this.state
    return (
      <div className="notfoundcontainer">
        <img
          src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688465594/Group_7394_njk283.png"
          className="dasdasd"
          alt="no movies"
        />
        <p>Your search for {newfind} did not find any matches</p>
      </div>
    )
  }

  suces = () => {
    const {moviesList} = this.state
    if (moviesList.length === 0) {
      return this.Notfound()
    }
    return (
      <ul className="ulo">
        {moviesList.map(each => (
          <MOVIES first={each} key={each.id} />
        ))}
      </ul>
    )
  }

  progress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  click = () => {
    this.getProducts()
  }

  failure = () => <Failureview click={this.click} />

  acess = () => {
    const {status, newfind} = this.state
    if (newfind.length === 0) {
      return <p>{null}</p>
    }
    switch (status) {
      case apiStatus.sucess:
        return this.suces()
      case apiStatus.inProgress:
        return this.progress()
      case apiStatus.failure:
        return this.failure()
      default:
        return null
    }
  }

  render() {
    const {find, moviesList} = this.state
    console.log(find)
    return (
      <div className="search-container">
        <div className="searchHeader">
          <div className="headerfirst">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688030727/Group_7399_oapuu0.png"
                className="movies-icon"
                alt="website logo"
              />
            </Link>
            <Link to="/">
              <p className="tophead">Home</p>
            </Link>
            <Link to="/popular">
              <p className="tophead">Popular</p>
            </Link>
          </div>
          <div className="headersecond">
            <div className="searchCard">
              <input
                onChange={this.changing}
                type="search"
                className="inputy1"
              />
              <button
                className="searchofbutton"
                testid="searchButton"
                onClick={this.clicking}
              >
                <HiOutlineSearch size={15} />
              </button>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688305563/Mask_Group_ukjaml.png"
                alt="profile"
              />
            </Link>
          </div>
        </div>

        <div className="fetched">{this.acess()}</div>
      </div>
    )
  }
}

export default Search
