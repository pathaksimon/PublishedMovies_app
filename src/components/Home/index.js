import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {ImCross} from 'react-icons/im'
import Footer from '../Footer'
import TopRated from '../TopRated'
import Header from '../Header'
import ReactSlick from '../Trending'
import './index.css'

import Failureview from '../Failureview'
import Failureinbackground from '../Failureinbackground'

const apiStatus = {
  initial: 'INITIAL',
  sucess: 'SUCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    Trend: [],
    original: [],
    Toprated: [],
    random: {},
    status: apiStatus.initial,
    status1: apiStatus.initial,
    status2: apiStatus.initial,
    status3: apiStatus.initial,
    changingvalues: false,
    onClickHideMenu: false,
    Inputvalue: '',
  }

  componentDidMount() {
    this.getProducts()
    this.getProducts1()
    this.getProducts2()
  }

  getProducts2 = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status2: apiStatus.inProgress})
    const apiUrlOrigi = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const responseOrigi = await fetch(apiUrlOrigi, options)
    if (responseOrigi.ok) {
      const dataorigi = await responseOrigi.json()
      const updatedorigi = dataorigi.results.map(eachorigi => ({
        id: eachorigi.id,
        backdropPath: eachorigi.backdrop_path,
        overview: eachorigi.overview,
        posterPath: eachorigi.poster_path,
        title: eachorigi.title,
      }))
      const originallength = updatedorigi.length
      const randomness = Math.random() * originallength
      const flooring = Math.floor(randomness)

      const finale = updatedorigi[flooring]
      this.setState({random: finale})
      this.setState({status2: apiStatus.sucess})
    } else {
      this.setState({status2: apiStatus.failure})
    }
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status: apiStatus.inProgress})
    const apiUrltrend = 'https://apis.ccbp.in/movies-app/trending-movies'

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

      this.setState({Trend: updatedTrend})
      this.setState({status: apiStatus.sucess})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  getProducts1 = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status1: apiStatus.inProgress})
    const apiUrlOrigi = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const responseOrigi = await fetch(apiUrlOrigi, options)
    if (responseOrigi.ok) {
      const dataorigi = await responseOrigi.json()
      const updatedorigi = dataorigi.results.map(eachorigi => ({
        id: eachorigi.id,
        backdropPath: eachorigi.backdrop_path,
        overview: eachorigi.overview,
        posterPath: eachorigi.poster_path,
        title: eachorigi.title,
      }))
      const originallength = updatedorigi.length

      this.setState({original: updatedorigi})
      this.setState({status1: apiStatus.sucess})
    } else {
      this.setState({status1: apiStatus.failure})
    }
  }

  click = () => {
    this.getProducts()
  }

  clickinbackground = () => {
    this.getProducts2()
  }

  makingclick = () => {
    this.getProducts1()
  }

  failure = () => <Failureview click={this.click} />

  sucess = () => {
    const {Trend} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {Trend.map(each1 => (
          <ReactSlick first={each1} key={each1.id} />
        ))}
      </Slider>
    )
  }

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  acess = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.sucess:
        return this.sucess()
      case apiStatus.failure:
        return this.failure()
      case apiStatus.inProgress:
        return this.loading()
      default:
        return null
    }
  }

  sucess2 = () => {
    const {original} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {original.map(each1 => (
          <ReactSlick first={each1} key={each1.id} />
        ))}
      </Slider>
    )
  }

  failure2 = () => <Failureview click={this.makingclick} />

  acess2 = () => {
    const {status1} = this.state
    switch (status1) {
      case apiStatus.sucess:
        return this.sucess2()
      case apiStatus.failure:
        return this.failure2()
      case apiStatus.inProgress:
        return this.loading()
      default:
        return null
    }
  }

  inputvalue = Value => {
    this.setState({Inputvalue: Value})
  }

  third = value => {
    console.log(value)
  }

  clickontoggling = () => {
    this.setState({changingvalues: true})
  }

  description = () => {
    const {changingvalues} = this.state
    if (changingvalues) {
      return 'description'
    }
    return 'display'
  }

  onClickHideMenu = () => {
    const {onClickHideMenu} = this.state
    this.setState({changingvalues: false})
  }

  icon = () => {
    const {onClickHideMenu} = this.state
    if (onClickHideMenu) {
      return 'icons1'
    }
    return 'icons'
  }

  sucess3 = () => {
    const {Trend, original, random, Inputvalue} = this.state
    const {backdropPath, title, overview, id} = random
    return (
      <div
        className="Hometopbackground"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${backdropPath})`,
        }}
        alt={title}
      >
        <Header
          third={this.third}
          inputvalue={this.inputvalue}
          clickontoggling={this.clickontoggling}
        />
        <div className="descriptioncard">
          <h1>{title}</h1>
          <p>{overview}</p>
          <Link to={`/movies/${id}`}>
            <button className="playbutton">Play</button>
          </Link>
        </div>
      </div>
    )
  }

  failure3 = () => (
    <Failureinbackground clickinbackground={this.clickinbackground} />
  )

  acess3 = () => {
    const {status1} = this.state
    switch (status1) {
      case apiStatus.sucess:
        return this.sucess3()
      case apiStatus.failure:
        return this.failure3()
      case apiStatus.inProgress:
        return this.loading()
      default:
        return null
    }
  }

  render() {
    const {Trend, original, random, Inputvalue, changingvalues} = this.state
    const {backdropPath} = random
    console.log(Trend)
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <div className="HomeContainer">
        {this.acess3()}

        <div className="homebottomcenter">
          <div className="firstSlider">
            <h1 className="headoftrends">Trending Now</h1>

            {this.acess()}
          </div>
          <div className="middleSlider">
            <h1 className="headoftrends">Top rated</h1>

            <TopRated />
          </div>
          <div className="secondSlider">
            <h1 className="headoftrends">Originals</h1>

            {this.acess2()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
