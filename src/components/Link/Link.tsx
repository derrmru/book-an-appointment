import './Link.css'

interface Props {
    text: string,
    to: string,
    newTab: boolean
}

const Link: React.FC<Props> = (props) => {
    return (
        <div className="page-link">
            <a
                href={props.to}
                target={props.newTab ? "_blank" : "_self"}
                rel={props.newTab ? "noreferrer" : ""}
                >
                    {props.text}
                </a>
        </div>
    )
}

export default Link