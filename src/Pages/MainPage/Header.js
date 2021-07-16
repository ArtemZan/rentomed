import React from "react"
import "./Header.css"

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = { lastScroll: 0, hide: false, fixScroll: false }
    }

    componentDidMount() {
        //window.addEventListener("scroll", this.OnScroll.bind(this))
    }

    componentWillUnmount() {

    }

    OnScroll(event) {

        if (window.scrollY < window.innerWidth * 0.5) {


            if (this.state.lastScroll > window.scrollY) {
                //Up
                this.setState({ hide: false })
            }
            else {
                //Down
                if (!this.state.hide)
                {
                    console.log("yes")
                    window.scrollTo({ top: 0 })
                    this.FixScroll()
                }
                this.setState({ hide: true })
            }
        }

        this.setState({ lastScroll: window.scrollY })
    }

    FixScroll()
    {
        this.setState({fixScroll: true})
        setTimeout(()=>{this.setState({fixScroll: false})}, 200)
    }

    render() {

        return (
            <div id = "header" className="header main-page-header" style={{ marginBottom: this.state.hide ? "-70vw" : "" }} >
                <img src="logo.jpeg" />
            </div>
        )
    }
}

export default Header