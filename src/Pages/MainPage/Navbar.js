import "./Navbar.css"
import { Dropdown } from "../../Components"

function Navbar() {
    let [dropdown1, dropdown2] = [null, null].map((nothing, index) => <Dropdown className = {"pages-dropdown pages-" + index} name={"Consumer"} content={[
        { name: "Consumer", link: "#" },
        { name: "Doctor", link: "#" },
        { name: "Vendor", link: "#" },
        { name: "Hospital", link: "#" }
    ]} />)


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
                
                {dropdown1}

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

                <div className="subsection">
                    <i className="material-icons add-to-cart">add_shopping_cart</i>
                    <i className="far fa-heart" />
                    <a className="login-button">Login</a>
                    <a className="signup-button">Sign up</a>
                </div>

                {dropdown2}
            </div>
        </div>)
}

export default Navbar