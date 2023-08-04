import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Logout = props => {
  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="logout">
      <Header />
      <div className="logoutcenter">
        <div className="logoutdetails">
          <h1>Account</h1>
          <hr className="hori" />
          <div>
            <p>Member ship</p>
            <div>
              <p>rahul@gmail.com</p>
              <p>password:</p>
            </div>
          </div>
          <hr className="hori" />
          <div>
            <p>Plan details</p>
            <p>Premium</p>
            <p>Ultra HD</p>
          </div>
          <hr className="hori" />
          <div>
            <button onClick={clickLogout} className="logoutbutton">
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Logout
