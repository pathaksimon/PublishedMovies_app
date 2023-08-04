import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'
import {ImCross} from 'react-icons/im'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
  state = {
    headclicked: false,
  }

  change = event => {
    const {third, inputvalue, clickontoggling, popularclick} = this.props
    const last = event.target.value
    inputvalue(last)
  }

  clicktoggle = () => {
    const {headclicked} = this.state
    this.setState({headclicked: true})
  }

  bottomhead = () => {
    const {headclicked} = this.state

    if (headclicked) {
      return 'bottomhead'
    }
    return 'notdisplayhead'
  }

  onClickHideMenu = () => {
    const {headclicked} = this.state
    this.setState({headclicked: false})
  }

  render() {
    const {third, inputvalue, clickontoggling, popularclick} = this.props

    return (
      <div className="headinger">
        <div className="firsthead">
          <div className="headerbox1">
            <Link className="underline" to="/">
              <img
                src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688030727/Group_7399_oapuu0.png"
                className="moviesTitle"
                alt="website logo"
              />
            </Link>
            <Link className="underline" to="/">
              <p className="tophead12">Home</p>
            </Link>
            <Link className="underline" to="/popular">
              <p className="tophead12">Popular</p>
            </Link>
          </div>

          <div className="headerbox21">
            <Link to="/search">
              <button
                type="button"
                className="searchbutton"
                testid="searchButton"
              >
                <HiOutlineSearch
                  size={20}
                  color="white"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </Link>

            <Link to="/account" className="profile">
              <img
                src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688305563/Mask_Group_ukjaml.png"
                alt="profile"
              />
            </Link>
            <button onClick={this.clicktoggle} className="clickbutton">
              <img src="https://res.cloudinary.com/dsxljhpge/image/upload/v1688896630/add-to-queue_1_aaqevj.png" />
            </button>
          </div>
        </div>
        <div className={this.bottomhead()}>
          <Link to="/">
            <p className="head12">Home</p>
          </Link>
          <Link to="/popular">
            <p className="head12">Popular</p>
          </Link>
          <Link to="/account">
            <p className="head12">Account</p>
          </Link>

          <ImCross
            size={10}
            color="#ffffff"
            onClick={this.onClickHideMenu}
            className="icon"
          />
        </div>
      </div>
    )
  }
}

export default Header
