import React from "react"
import "./Content.css"
import { Dropdown } from "../../Components"

function ProductsNavbar() {
    return (
        <div className="products-navbar">
            <i className="fas fa-bars"></i>
            <Dropdown title={"All Products"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
            <Dropdown title={"Covid Essential"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
            <Dropdown title={"Rental"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
            <Dropdown title={"Healthcare Devices"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
            <Dropdown title={"Home Care"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
            <Dropdown title={"Personal Care"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
            <Dropdown title={"Fitness & Supplements"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
            <Dropdown title={"Mom & Baby"} content={[
                { link: "#", name: "Link 1" },
                { link: "#", name: "Link 2" },
                { link: "#", name: "Link 3" },
            ]} />
        </div>)
}

class Proposals extends React.Component {
    constructor(props) {
        super(props)

        this.state = { cardNumber: 0, windowWidth: window.innerWidth, dots: <></> }
        this.cardsNumber = props.cards.length
        this.updateDots = true

        this.cards = props.cards.map((card, index) => {
            return (
                <div key={index}>
                    <img src={card.img} />
                    <h3 className="highlight">{card.highlight}</h3>
                    <h1 className="title">{card.title}</h1>
                    <p className="addition">{card.addition}</p>
                    <p className="tags">{card.tags}</p>
                    <a className="know-more">
                        Know More
                    </a>
                </div>)
        })
    }

    componentDidMount() {
        window.addEventListener("resize", this.OnResize.bind(this))
        this.GenDots(true)
        //Load proposals maybe
    }

    componentDidUpdate() {
        if (this.updateDots) {
            this.GenDots(true)
            this.updateDots = false
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.OnResize.bind(this))
    }

    Next() {
        this.setState({ cardNumber: this.state.cardNumber + 1 })
        this.GenDots()
    }

    Prev() {
        this.setState({ cardNumber: this.state.cardNumber - 1 })
        this.GenDots()
    }

    GenDots(update_now) {
        if (update_now) {
            let dots = []
            for (let i in this.props.cards) {
                dots.push(<div key={i} className={i == this.state.cardNumber ? "active" : ""} />)
            }

            this.setState({ dots: dots })

            this.updateDots = false
        }
        else {
            this.updateDots = true
        }
    }

    OnResize() {
        this.setState({ windowWidth: window.innerWidth })
    }

    render() {
        return (
            <div className="proposals-container">
                <div className="arrows">

                    {this.state.cardNumber !== 0 ? <i className="fas fa-chevron-left" onClick={this.Prev.bind(this)} /> : <></>}
                    {this.state.cardNumber !== this.cardsNumber - 1 ? <i className="fas fa-chevron-right" onClick={this.Next.bind(this)} /> : <></>}
                </div>

                <div className="proposals-wrapper">
                    <div className="proposals" style={{ left: -this.state.cardNumber * this.state.windowWidth * 0.95 }}>
                        {this.cards}
                    </div>
                </div>
                <div className="dots">
                    {this.state.dots}
                </div>
            </div>
        )
    }
}

function Card(props, key) {
    return (
        <div className="card" key={key}>
            <img src={props.img} style={{
                backgroundColor: props.background,
                boxShadow: props.shadow ? "0 0 10px #0002" : "none",
                border: props.border ? "1px solid #0002" : "none"
            }} />
            <p>{props.title}</p>
        </div>
    )
}

function CategoryCard(props, key) {
    return (
        <div className="card category-card" key={key} style={{ backgroundColor: props.background, height: props.height - 40 + "px" }}>
            <p>{props.title}</p>
            <a href={props.link}>View More</a>
            <div className="image-wrapper">
                <img src={props.img} style={{ width: props.width - 30 + "px", height: props.height - 120 + "px", backgroundColor: props.background }} />
            </div>
        </div>
    )
}

class ScrollingBar extends React.Component {
    constructor(props) {
        super(props)

        if (props.cardGenerator) {
            if (props.props) {
                this.cards = this.props.cards.map((card, index) => {
                    let cardProps = Object.assign(props.props, card, { height: (props.height ? props.height : 228) })
                    return this.props.cardGenerator(cardProps, index)
                })
            }
            else {
                this.cards = this.props.cards.map((card, index) => this.props.cardGenerator(Object.assign(card, { height: (props.height ? props.height : 228) }), index))
            }
        }
        else {
            this.cards = []
        }


        this.defaultCardWidth = this.props.separate ? 220 : 180
        if (props.defaultCardWidth)
            this.defaultCardWidth = props.defaultCardWidth
        this.cardsCount = props.cards.length
        this.offsetLeft = this.props.separate ? 20 : 40

        this.summaryWidth = 0
        for (let c of this.props.cards) {
            if (c.width)
                this.summaryWidth += c.width + 40
            else
                this.summaryWidth += this.defaultCardWidth
        }

        this.state = {
            offset: 0,
            margin: 0,
            touchingLeftBorder: true,
            touchingRightBorder: false
        }

        this.state.touchingRightBorder = this.summaryWidth < window.innerWidth * 0.9
    }

    Left() {
        let new_offset = this.state.offset
        new_offset -= 2

        let margin = 0
        if (this.state.touchingRightBorder) {
            for (let i = 0; i < new_offset; i++) {
                margin -= (this.props.cards[i].width ? this.props.cards[i].width : this.defaultCardWidth)
            }
        }
        else {
            margin = this.state.margin
            for (let i = this.state.offset; i > new_offset; i--) {
                margin += (this.props.cards[i].width ? this.props.cards[i].width : this.defaultCardWidth)
            }
        }

        if (new_offset <= 0) {
            new_offset = 0
            margin = 0
            this.setState({ touchingLeftBorder: true })
        }

        this.setState({ offset: new_offset, touchingRightBorder: false, margin: margin })
    }

    Right() {
        let new_offset = this.state.offset
        new_offset += 2

        let margin = this.state.margin
        for (let i = this.state.offset; i < new_offset; i++) {
            margin -= (this.props.cards[i].width ? this.props.cards[i].width + 40 : this.defaultCardWidth)
        }

        if (window.innerWidth * 0.9 - margin > this.summaryWidth) {
            margin = window.innerWidth * 0.9 - this.summaryWidth - this.offsetLeft
            this.setState({ touchingRightBorder: true })
        }

        this.setState({ offset: new_offset, touchingLeftBorder: false, margin: margin })
    }

    componentDidMount() {
    }

    render() {

        return (
            <div style={{ height: (this.props.height ? this.props.height : "") }} className={"scrolling-bar" + (this.props.separate ? " scrolling-bar-separated" : "")}>
                <div className="arrows">
                    {this.state.touchingLeftBorder ? <></> : <i className="fas fa-chevron-left" onClick={this.Left.bind(this)}></i>}
                    {this.state.touchingRightBorder ? <></> : <i className="fas fa-chevron-right" onClick={this.Right.bind(this)}></i>}
                </div>
                <div className="cards-wrapper">
                    <div className={"cards" + (this.props.separate ? " cards-separated" : "")}
                        style={{ marginLeft: this.state.margin, height: (this.props.height ? this.props.height : "") }}>
                        {this.cards}
                    </div>
                </div>
            </div>
        )
    }
}


function Content() {
    return (
        <div className="content main-page-content">
            <ProductsNavbar />
            <Proposals cards={[
                {
                    img: "Images/img219.jpg",
                    highlight: "Crack today's deal for hospital equipments",
                    title: "Laser Machine",
                    addition: <>Available Now <strong>980Nm 1470Nm 1940Nm</strong></>,
                    tags: "Practology I Spieder Veins I Dental I Cosmo Gynocology I General Surgery I Varicose Veins I Liposuction I ENT I Physio Therapy and Many More"
                },
                {
                    img: "Images/img219.jpg",
                    highlight: "Crack today's deal for hospital equipments",
                    title: "Laser Machine",
                    addition: <>Available Now <strong>980Nm 1470Nm 1940Nm</strong></>,
                    tags: "Practology I Spieder Veins I Dental I Cosmo Gynocology I General Surgery I Varicose Veins I Liposuction I ENT I Physio Therapy and Many More"
                }
            ]} />
            <h4 className="content-title">
                Now shop daily essential products for home, hospitals, offices, shopping malls etc
            </h4>

            <h4 className="content-subtitle">
                Your Interseted Products
            </h4>
            <ScrollingBar cards={
                [
                    { img: "Products/Rento/1.png", title: "title" },
                    { img: "Products/Rento/3.png", title: "title" },
                    { img: "Products/Rento/4.png", title: "title" },
                    { img: "Products/Rento/4.png", title: "title" },
                    { img: "Products/Rento/4.png", title: "title" },
                    { img: "Products/Rento/4.png", title: "title" },
                    { img: "Products/Rento/4.png", title: "title" },
                    { img: "Products/Rento/4.png", title: "title" },
                ]} cardGenerator={Card} props={{ background: "#ffeeee" }} />

            <h4 className="content-subtitle">
                Explore Your Interested Products
            </h4>
            <ScrollingBar separate background="white" cards={[
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
            ]} cardGenerator={Card} />

            <h4 className="content-subtitle">
                Best Selling Products
            </h4>
            <ScrollingBar cards={[
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
            ]} cardGenerator={Card} props={{ background: "#ccccff" }} />

            <h4 className="content-subtitle">
                Check out the most popular categories
            </h4>
            <ScrollingBar height={300} separate background="white" cards={[
                { img: "Products/Rento/1.png", title: "title", width: 200, background: "#ccffd0" },
                { img: "Products/Rento/3.png", title: "title", width: 150, background: "#ccd0ff" },
                { img: "Products/Rento/4.png", title: "title", width: 220, background: "#ffccd0" },
                { img: "Products/Rento/1.png", title: "title", width: 150, background: "#fff0cc" },
                { img: "Products/Rento/3.png", title: "title", width: 180, background: "#f0e8ff" },
                { img: "Products/Rento/4.png", title: "title", width: 250, background: "#ccffd0" },
                { img: "Products/Rento/1.png", title: "title", width: 250, background: "#ccffd0" },
                { img: "Products/Rento/3.png", title: "title", width: 250, background: "#ccffd0" },
                { img: "Products/Rento/4.png", title: "title", width: 250, background: "#ccffd0" },
            ]} cardGenerator={CategoryCard} />

            <h4 className="content-subtitle">
                Explore New Launches
            </h4>
            <ScrollingBar separate background="white" cards={[
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
            ]} cardGenerator={Card} />

            <div className="know-more">
                <p>Available Now 24x7</p>
                <div>
                    <h2>India's largest healthcare online store crack your deal now!</h2>
                    <button>Know More</button>
                </div>
            </div>

            <h4 className="content-subtitle">
                Explore by Health Concerns
            </h4>
            <ScrollingBar cards={[
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
            ]} cardGenerator={Card} props={{ background: "#cfc" }} />

            <h4 className="content-subtitle">
                Explore Fitness {"&"} Supplements
            </h4>
            <ScrollingBar separate cards={[
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
            ]} cardGenerator={CategoryCard} props={{ background: "#ffe0b0" }} />

            <h4 className="content-subtitle">
                Healthcare Devices
            </h4>
            <ScrollingBar separate cards={[
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
            ]} cardGenerator={Card} props={{ background: "white" }} />

            <h4 className="content-subtitle">
                Home Care Products
            </h4>
            <ScrollingBar cards={[
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
                { img: "Products/Rento/1.png", title: "title" },
                { img: "Products/Rento/3.png", title: "title" },
                { img: "Products/Rento/4.png", title: "title" },
            ]} cardGenerator={Card} props={{ background: "white", shadow: true }} />

            <h4 className="content-subtitle">
                Explore by Top Brands
            </h4>
            <ScrollingBar height={200} cards={[
                { img: "Products/Rento/1.png" },
                { img: "Products/Rento/3.png" },
                { img: "Products/Rento/4.png" },
                { img: "Products/Rento/1.png" },
                { img: "Products/Rento/3.png" },
                { img: "Products/Rento/4.png" },
                { img: "Products/Rento/1.png" },
                { img: "Products/Rento/3.png" },
                { img: "Products/Rento/4.png" },
            ]} cardGenerator={Card} props={{ background: "white", border: true }} />
        </div>
    )
}

export default Content