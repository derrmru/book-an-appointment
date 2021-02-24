import './Loading.css'

const WakingUp: React.FC = () => {

    return (
        <div className="waking-up">
            <div className="loading-icon">
                <div className="first-circle"></div>
            </div>
            <p className="loading-text">Loading...</p>
        </div>
    )
}

export default WakingUp