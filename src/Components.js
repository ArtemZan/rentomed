import "./Style/Components.css"

function Dropdown(props) {
    return (
        <div className={"dropdown basic-dropdown" + (props.className ? " " + props.className : "")}>
            <button>
                {props.title}
                {props.name}
                {props.withoutArrow ? <></> : <i className="fas fa-chevron-down" />}
            </button>
            <div className="options">
                {props.content.map((element, index) => { return <a key={index} href={element.link}>{element.name}</a> })}
            </div>
        </div>
    )
}

export { Dropdown }