import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Failureview from '../Failureview'

import Header from '../Header'
import './index.css'

const GENRES1 = props => {
  const {first} = props
  const {name} = first
  return (
    <li className="listparacolor">
      <p>{name}</p>
    </li>
  )
}

const SPOKEN = props => {
  const {first} = props
  const {englishName} = first
  return (
    <li className="listparacolor">
      <p>{englishName}</p>
    </li>
  )
}

const SIMILAR = props => {
  const {first} = props
  const {posterPath, title} = first
  return (
    <li className="postercard">
      <img src={posterPath} className="poster" alt={title} />
    </li>
  )
}

const apiStatus = {
  initial: 'INITIAL',
  sucess: 'SUCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Indepth extends Component {
  state = {
    Indepth1: {},
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.Indepth()
  }

  Indepth = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({status: apiStatus.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const final = [data.movie_details].map(each1 => ({
        backdropPath: each1.backdrop_path,
        budget: each1.budget,
        genres: each1.genres,
        id: each1.id,
        overview: each1.overview,

        releaseData: each1.release_date,
        runtime: each1.runtime,
        similarMovies: each1.similar_movies.map(each2 => ({
          backdropPath: each2.backdrop_path,
          id: each2.id,
          posterPath: each2.poster_path,
          title: each2.title,
        })),
        spokenLanguages: each1.spoken_languages.map(each3 => ({
          id: each3.id,
          englishName: each3.english_name,
        })),
        title: each1.title,
        adult: each1.adult,
        voteAverage: each1.vote_average,
        voteCount: each1.vote_count,
      }))
      const zeroth = final[0]
      const zeroth1 = zeroth.genres
      const zeroth2 = zeroth.spokenLanguages
      const zeroth3 = zeroth.similarMovies

      this.setState({Indepth1: zeroth})
      this.setState({genres: zeroth1})
      this.setState({spokenLanguages: zeroth2})
      this.setState({similarMovies: zeroth3})
      this.setState({status: apiStatus.sucess})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  sucess = () => {
    const {Indepth1, genres, spokenLanguages, similarMovies} = this.state
    const {
      backdropPath,
      voteAverage,
      voteCount,
      budget,
      releaseData,
      title,
      overview,
      id,
      adult,
    } = Indepth1
    console.log(Indepth1)
    return (
      <>
        <div
          className="Indepthtopbackground"
          style={{
            backgroundImage: `url(${backdropPath})`,
          }}
        >
          <Header />
          <div className="descriptioncard">
            <h1>{title}</h1>
            <p>{adult ? 'A' : 'U/A'}</p>
            <p>{overview}</p>

            <Link to={`/movies/${id}`}>
              <button className="playbutton">Play</button>
            </Link>
          </div>
        </div>
        <div className="Indepthsecondcard">
          <ul className="genre">
            <h1 className="paracolor">genres</h1>
            {genres.map(each4 => (
              <GENRES1 first={each4} key={each4.id} />
            ))}
          </ul>
          <ul className="genre">
            <h1 className="paracolor">Audio Available</h1>
            {spokenLanguages.map(each4 => (
              <SPOKEN first={each4} key={each4.id} />
            ))}
          </ul>
          <div className="genre">
            <h1 className="paracolor">Rating Count</h1>
            <p className="listparacolor">{voteAverage}</p>
            <h1 className="paracolor">Rating Average</h1>
            <p className="listparacolor">{voteCount}</p>
          </div>
          <div className="genre">
            <h1 className="paracolor">Budget</h1>
            <p className="listparacolor">{budget}</p>
            <h1 className="paracolor">Release Date</h1>
            <p className="listparacolor">{releaseData}</p>
          </div>
        </div>
        <h1 className="bottom-head">More like this</h1>
        <ul className="bottomimagesContainer">
          {similarMovies.map(aich => (
            <SIMILAR first={aich} key={aich.id} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  click = () => {
    this.Indepth()
  }

  failure = () => <Failureview click={this.click} />

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

  render() {
    const {Indepth1, genres, spokenLanguages, similarMovies} = this.state
    const {backdropPath, voteAverage, voteCount, budget, releaseData} = Indepth1

    console.log(Indepth1)
    return <div className="IndepthContainer">{this.acess()}</div>
  }
}

export default Indepth
