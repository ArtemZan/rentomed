import React from "react"


import "./Style/Components.css"

function Dropdown(props) {
    return (
        <div className={"dropdown basic-dropdown" + (props.className ? " " + props.className : "")}>
            <button>
                {props.title}
                {props.name}
                {props.hideArrow ? <></> : <i className="fas fa-chevron-down dropdown-arrow-down" />}
            </button>
            <div className= {"options" + (props.right ? " right" : "")} >
                {props.content.map((element, index) => { return <a key={index} href={element.link}>{element.name}</a> })}
            </div>
        </div>
    )
}

/*
Props:
    cards: Array : [{width: Number, ...any}...]
    cardGenerator: function(props : {}, card: {width: Number, ...any})
    separate: boolean
    props: {}
    height ?
*/
class ScrollingBar extends React.Component {
    constructor(props) {
        super(props)

        this.cardsWrapper = React.createRef()

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
            left: 0,
            touchingLeftBorder: true,
            touchingRightBorder: false
        }

        this.state.touchingRightBorder = this.summaryWidth < window.innerWidth * 0.9
    }


    componentDidMount() {

    }

    componentDidUpdate() {
        if (this.animationRequied)
            this.AnimateSliding(false)
    }

    AnimateSliding(after_update) {
        if (after_update) {
            this.animationRequied = true
            return
        }

        this.animationRequied = false


        let currentLeft = this.cardsWrapper.current.scrollLeft

        const delta = 30
        const treshhold = 0.1

        let animate = () => {
            //console.log(this.state.left, currentLeft)

            if (Math.abs(this.state.left - currentLeft) < treshhold) {
                return;
            }

            if (Math.abs(this.state.left - currentLeft) <= delta / 2) {
                this.cardsWrapper.current.scrollLeft = this.state.left
                return;
            }

            if (currentLeft < this.state.left) {
                currentLeft += delta
            }
            else {
                currentLeft -= delta
            }

            this.cardsWrapper.current.scrollLeft = currentLeft

            setTimeout(animate, 17)
        }

        animate()
    }

    CalcOffset() {
        // Calculate how many cards are at left

        let left = 0
        let offset = 0
        for (; offset < this.props.cards.length && left < this.cardsWrapper.current.scrollLeft; offset++) {
            if (this.props.cards[offset].width) {
                left += this.props.cards[offset].width
            }
            else {
                left += this.defaultCardWidth
            }
        }

        console.log(offset)

        return offset;
    }

    CalcLeft(offset) {
        let left = 0
        if (offset <= 0) {
            return 0;
        }

        for (let i = 0; i < offset && i < this.props.cards.length; i++) {
            left += (this.props.cards[i].width ? this.props.cards[i].width : this.defaultCardWidth)
        }

        console.log("Left: ", left)

        return left;
    }

    OnScroll(event) {
        if (window.innerWidth * 0.9 + event.target.scrollLeft >= this.summaryWidth) {
            this.setState({ touchingRightBorder: true })
        }
        else {
            this.setState({ touchingRightBorder: false })
        }

        if (event.target.scrollLeft === 0) {
            this.setState({ touchingLeftBorder: true })
        }
        else {
            this.setState({ touchingLeftBorder: false })
        }
    }

    MoveLeft() {
        let old_offset = this.CalcOffset()
        let new_offset = old_offset - 2

        let left = 0
        left = this.CalcLeft(new_offset)

        if (new_offset <= 0) {
            new_offset = 0
            this.setState({ touchingLeftBorder: true })
        }

        this.setState({ offset: new_offset, touchingRightBorder: false, left: left })

        this.AnimateSliding(true)
    }

    MoveRight() {
        let old_offset = this.CalcOffset()
        let new_offset = old_offset + 2

        let left = this.CalcLeft(new_offset)

        if (window.innerWidth * 0.9 + left > this.summaryWidth) {
            left = -window.innerWidth * 0.9 + this.summaryWidth + this.offsetLeft
            this.setState({ touchingRightBorder: true })
        }

        this.setState({ offset: new_offset, touchingLeftBorder: false, left: left })

        this.AnimateSliding(true)
    }

    render() {
        return (
            <div style={{ height: (this.props.height ? this.props.height : "") }} className={"scrolling-bar" + (this.props.separate ? " scrolling-bar-separated" : "")}>
                <div className="arrows">
                    {this.state.touchingLeftBorder ? <></> : <i className="fas fa-chevron-left" onClick={this.MoveLeft.bind(this)}></i>}
                    {this.state.touchingRightBorder ? <></> : <i className="fas fa-chevron-right" onClick={this.MoveRight.bind(this)}></i>}
                </div>
                <div className="cards-wrapper" ref={this.cardsWrapper} onScroll={this.OnScroll.bind(this)}>
                    <div className={"cards" + (this.props.separate ? " cards-separated" : "")}
                        style={{ height: (this.props.height ? this.props.height : "") }}>
                        {this.cards}
                    </div>
                </div>
            </div>
        )
    }
}



export { Dropdown, ScrollingBar }