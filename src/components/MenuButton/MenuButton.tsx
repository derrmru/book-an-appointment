import './MenuButton.css'

interface Props {
    setToggle: () => void,
    show: boolean
}

const MenuButton: React.FC<Props> = (props) => {
    return (
        <button 
            aria-label="toggle navigation menu on mobile"
            className="menu-button"
            onClick={() => props.setToggle()}
            style={props.show ? {border: 'none'} : {border: 'none'}}
            >
            {
                !props.show ?
                    <>
                        <div className="stripe"></div>
                        <div className="stripe"></div>
                        <div className="stripe"></div>
                    </> :
                    <div className="exit-cross">|X|</div>
            }
        </button>
    )
}

export default MenuButton