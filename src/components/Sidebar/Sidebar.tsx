import { useState, useLayoutEffect } from 'react'
import Link from '../Link/Link'
import MenuButton from '../MenuButton/MenuButton'
import './Sidebar.css'

interface Props {
    stage: number,
    title: string
}

const Sidebar: React.FC<Props> = (props) => {
    const [showMenu, setShowMenu] = useState<boolean>(true);

    const unfillProgress = {backgroundColor: 'var(--the-white)', color: 'var(--the-black)'};
    const fillProgress = {backgroundColor: 'var(--the-black)', color: 'white'};

    useLayoutEffect(() => {
        function updateSize() {
          window.innerWidth < 1025 ? 
              setShowMenu(false) :
                  setShowMenu(true)
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);

    return (
        <>
        <MenuButton 
            setToggle={() => setShowMenu(!showMenu)}
            show={showMenu}
            />

                <div className="sidebar-container" style={showMenu ? {display: 'inline'} : {display: 'none'}}>
                    <div className="sidebar-scroll">
                        <div className="sidebar-titles">
                            <h1>London Foot & Ankle Surgery</h1>
                            <h2>{props.title}</h2>
                        </div>
                        <hr />
                        <h3 style={{fontSize: '20px'}}>Progress</h3>
                        <div className='stage-text'>{props.stage < 3 && <>Stage {props.stage + 1}: </>}
                        {
                            props.stage === 0 ? <> Select an Appointment Type</> : 
                                props.stage === 1 ? <> Select a Time</> :
                                    props.stage === 2 ? <> Submit Booking Form</> :
                                        props.stage === 3 ? <> Successful Booking </> :
                                            props.stage === 4 ? <> Your Details</> :
                                                props.stage === 5 && <> Finalise Appointment </>
                        }
                        </div>
                        <div className="progress-bar">
                            <div
                                className='progression'
                                style={fillProgress}
                                >1</div>
                            <div
                                className='progression'
                                style={(props.stage > 0 && props.stage < 4) || props.stage === 5 ? fillProgress : unfillProgress}
                                >2</div>
                            <div
                                className='progression'
                                style={(props.stage === 2 || props.stage === 5 || props.stage === 3) ? fillProgress : unfillProgress}
                                >3</div>
                        </div>
                        <hr />
                        <div className="sidebar-items">
                            <Link 
                                text="Return To Main Website"
                                to="https://londonfootandanklesurgery.co.uk"
                                newTab={true}
                                />
                            <Link 
                                text="Book A Virtual Appointment"
                                to="https://appointments.londonfootandanklesurgery.co.uk"
                                newTab={false}
                                />
                            <Link 
                                text="Email"
                                to="mailto: admin@londonfootandanklesurgery.co.uk"
                                newTab={false}
                                />                            
                            <Link 
                                text="Telephone"
                                to="tel:+442078208007"
                                newTab={false}
                                />
                        </div>
                        <hr />
                        <div className="fine-print">
                            ©{new Date().getFullYear()}, London Foot & Ankle Surgery Ltd.
                        </div>
                    </div>
                </div>

        </>

    )
}

export default Sidebar