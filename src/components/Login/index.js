import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showsubmitError: false,
    errorMsg: '',
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  submitSucess = jwtToken => {
    const {history} = this.props

    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
  }

  submitFailure = errorMsg => {
    this.setState({
      showsubmitError: true,
      errorMsg,
    })
  }

  submit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.submitSucess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {showsubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <div className="topBar">
          <img
            src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688030727/Group_7399_oapuu0.png"
            className="moviesbar"
            alt="login website logo"
          />
        </div>
        <div className="logincard">
          <div className="login-center">
            <h1 className="login">Login</h1>
            <form onSubmit={this.submit}>
              <div className="usery">
                <label className="labeling" htmlFor="labels">
                  USERNAME
                </label>
                <br />
                <input
                  onChange={this.username}
                  id="labels"
                  className="inputy"
                />
              </div>
              <div className="passd">
                <label className="labeling" htmlFor="passwords">
                  PASSWORD
                </label>
                <br />
                <input
                  onChange={this.password}
                  type="password"
                  id="passwords"
                  className="inputy"
                />
              </div>
              {showsubmitError && <p className="error">*{errorMsg}</p>}
              <button type="submit" className="loginbutton">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
