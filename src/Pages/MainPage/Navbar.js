import "./Navbar.css"
// import { Dropdown } from "../../Components"

function Dropdown(props) {
    return (
        <div className="dropdown basic-dropdown actions">
            <button>
                {<i className="fas fa-bars" />}
            </button>
            <div className = "options right" >
                <a><i className="material-icons add-to-cart">add_shopping_cart</i></a>
                <a><i className="far fa-heart" /></a>
                <div className = "ignore-hover"><a className="login-button">Login</a></div>
                <div className = "ignore-hover"><a className="signup-button">Sign up</a></div>
                <a className = "page">Consumer</a>
                <a className = "page">Doctor</a>
                <a className = "page">Vendor</a>
                <a className = "page">Hospital</a>
            </div>
        </div>
    )
}

function Navbar() {
    return (
        <div className="navbar main-page-navbar">
            <img src="logo.jpeg" />
            <div className="section">
                <div className="pages">
                    <div className="selected">Consumer</div>
                    <div>Doctor</div>
                    <div>Vendor</div>
                    <div>Hospital</div>
                </div>

                <div className="city-and-search">
                    <div className="dropdown">
                        <div className="selected">Pune</div>
                        <i className="fas fa-caret-down"></i>
                        <div className="options">
                            <div></div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="search">
                        <i className="fas fa-search" />
                        <input placeholder="Search for healthcare products" />
                    </div>
                </div>

                <div className="actions">
                    <i className="material-icons add-to-cart">add_shopping_cart</i>
                    <i className="far fa-heart" />
                    <a className="login-button">Login</a>
                    <a className="signup-button">Sign up</a>
                </div>

                <Dropdown />

                {/* <Dropdown className = "actions" right hideArrow name = {} content = {[
                    {name: <i className="material-icons add-to-cart">add_shopping_cart</i>},
                    {name: <i className="far fa-heart" />},
                    {name: <div className="login-button">Login</div>},
                    {name: <div className="signup-button">Sign up</div>},                    
                ]}/> */}
            </div>
        </div>)
}

export default Navbar