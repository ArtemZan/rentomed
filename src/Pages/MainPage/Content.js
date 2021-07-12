import React from "react"
import "./Content.css"

function ProductsNavbar() {
    return (
        <div className="products-navbar">
            <i className="fas "></i>
        </div>)
}

class Proposals extends React.Component {

    componentDidMount() {
        //Load proposals
    }

    render() {
        return (
            <div className="proposals-container">
                <div className="proposal">

                </div>
                <div className="arrows">
                    <i className="fas fa-chevron-left"></i>
                    <i className="fas fa-chevron-right"></i>
                </div>
                <div className="dots">

                </div>
            </div>
        )
    }
}

function Card(props, key) {
    console.log(props)
    return (
        <div className="card" key = {key}>
            <img src={props.img} style={{ backgroundColor: props.background }} />
            <p>{props.title}</p>
        </div>
    )
}

class ScrollingBar extends React.Component {
    constructor(props) {
        super(props)

        if(props.cardGenerator)
        {
            if(props.props)
            {
                this.cards = this.props.cards.map((card, index) => this.props.cardGenerator(Object.assign(card, props.props), index))
            }
            else
            {
                this.cards = this.props.cards.map((card, index) => this.props.cardGenerator(card, index))
            }
        }
        else
        {
            this.cards = []
        }


        this.defaultCardWidth = this.props.separate ? 200 : 180
        if(props.defaultCardWidth)
            this.defaultCardWidth = props.defaultCardWidth
        this.cardsCount = props.cards.length
        this.offsetLeft = this.props.separate ? 20 : 40

        this.summaryWidth = 0
        for (let c of this.props.cards) {
            if (c.width)
                this.summaryWidth += c.width
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
        if(this.state.touchingRightBorder)
        {
            for(let i = 0; i < new_offset; i++)
            {
                margin -= (this.props.cards[i].width ? this.props.cards[i].width : this.defaultCardWidth)
            }
        }
        else
        {
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
            margin -= (this.props.cards[i].width ? this.props.cards[i].width : this.defaultCardWidth)
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
            <div className={"scrolling-bar" + (this.props.separate ? " scrolling-bar-separated" : "")}>
                <div className="arrows">
                    {this.state.touchingLeftBorder ? <></> : <i className="fas fa-chevron-left" onClick={this.Left.bind(this)}></i>}
                    {this.state.touchingRightBorder ? <></> : <i className="fas fa-chevron-right" onClick={this.Right.bind(this)}></i>}
                </div>
                <div className="cards-wrapper">
                    <div className={"cards" + (this.props.separate ? " cards-separated" : "")}
                        style={{ marginLeft: this.state.margin }}>
                        {this.cards}
                    </div>
                </div>
            </div>
        )
    }
}


class Categories extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return null
    }
}

function Content() {
    return (
        <div className="content main-page-content">
            <ProductsNavbar />
            <Proposals />
            <h4 className="content-title">
                Now shop daily essential products for home, hospitals, offices, shopping malls etc
            </h4>

            <h4 className="content-subtitle">
                Your Interseted Products
            </h4>
            <ScrollingBar cards={
                [
                    { img: "Products/Rento/1.png", title: "wtf" },
                    { img: "Products/Rento/3.png", title: "wtf" },
                    { img: "Products/Rento/4.png", title: "wtf" },
                    { img: "Products/Rento/4.png", title: "wtf" },
                    { img: "Products/Rento/4.png", title: "wtf" },
                    { img: "Products/Rento/4.png", title: "wtf" },
                    { img: "Products/Rento/4.png", title: "wtf" },
                    { img: "Products/Rento/4.png", title: "wtf" },
                ]} cardGenerator = {Card} props = {{background: "#ffeeee"}} />

                    <h4 className="content-subtitle">
                        Explore Your Interested Products
                    </h4>
                    <ScrollingBar separate background="white" cards={[
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                    ]} cardGenerator = {Card} />

                    <h4 className="content-subtitle">
                        Best Selling Products
                    </h4>
                    <ScrollingBar cards={[
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                    ]} cardGenerator = {Card} props = {{background: "#ccccff"}} />

                    <h4 className="content-subtitle">
                        Check out the most popular categories
                    </h4>
                    <ScrollingBar separate background="white" cards={[
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                        { img: "Products/Rento/1.png", title: "wtf" },
                        { img: "Products/Rento/3.png", title: "wtf" },
                        { img: "Products/Rento/4.png", title: "wtf" },
                    ]} cardGenerator = {Card}  props = {{background: "white"}}/>
        </div>
                )
            }

                export default Content






/*class ScrollingBar extends React.Component {
    constructor(props) {
        super(props)

        //For now
        let cardWidth = this.props.separate ? 200 : 180
        this.maxCardsVisible = Math.floor(window.innerWidth * 0.9 / cardWidth)
        console.log(this.maxCardsVisible)

        this.state = {
            offset: 0,
            cardsCount: props.cards.length,
            touchingLeftBorder: true,
            touchingRightBorder: false
        }

        this.state.touchingRightBorder = this.state.cardsCount < this.maxCardsVisible
    }

    Left() {
        let new_offset = this.state.offset
        new_offset -= 2
        if (new_offset <= 0) {
            new_offset = 0
            this.setState({ touchingLeftBorder: true })
        }
        this.setState({ offset: new_offset, touchingRightBorder: false })
    }

    Right() {
        let new_offset = this.state.offset
        new_offset += 2
        if (new_offset >= this.state.cardsCount - this.maxCardsVisible) {
            new_offset = this.state.cardsCount - this.maxCardsVisible
            this.setState({ touchingRightBorder: true })
        }
        this.setState({ offset: new_offset, touchingLeftBorder: false })
    }

    componentDidMount() {
    }

    render() {
        let defaultCardWidth = this.props.separate ? 200 : 180

        let summaryWidth = 0

        let cards = this.props.cards.map((card, index) => {
            if (card.width) {
                summaryWidth += card.width
            }
            else {
                summaryWidth += defaultCardWidth
            }

            return <div className="card" key={index}>
                <img src={card.img} style={{ backgroundColor: card.background ? card.background : this.props.background }} />
                <p>{card.title}</p>
            </div>
        })


        let offset = 0;
        for (let i = 0; i < this.state.offset; i++) {
            if (this.props.cards[i].width) {
                offset += this.props.cards[i].width
            }
            else {
                offset += defaultCardWidth
            }
        }


        let margin
        if (this.state.touchingRightBorder && !this.state.touchingLeftBorder)
            margin = window.innerWidth * 0.9 - summaryWidth - (this.props.separate ? 20 : 40)
        else {
            margin = -offset
        }


        return (
            <div className={"scrolling-bar" + (this.props.separate ? " scrolling-bar-separated" : "")}>
                <div className="arrows">
                    {this.state.touchingLeftBorder ? <></> : <i className="fas fa-chevron-left" onClick={this.Left.bind(this)}></i>}
                    {this.state.touchingRightBorder ? <></> : <i className="fas fa-chevron-right" onClick={this.Right.bind(this)}></i>}
                </div>
                <div className="cards-wrapper">
                    <div className={"cards" + (this.props.separate ? " cards-separated" : "")}
                        style={{ marginLeft: margin }}>
                        {cards}
                    </div>
                </div>
            </div>
        )
    }
}*/