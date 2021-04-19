import { useState } from 'react'
import $ from 'jquery'
import Loading from '../Loading/Loading'
import './FuFinder.css'

interface Props {
    setStage: (stage: number) => void,
    setIsFUAndSF: (x: boolean) => void,
    setIsFUAndIns: (y: boolean) => void,
    setFuFirstName: (fName: string) => void,
    setFuLastName: (lName: string) => void
}

const FuFinder: React.FC<Props> = (props) => {
    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [found, setFound] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(false);

    const details = {
        name: lName.trim(),
        dob: dob.split('-').reverse().join('.')
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setFound(false)
        setLoad(true)
        $.post("https://script.google.com/macros/s/AKfycbz-aYMLkSrTD7jHLI_UySYKZyrpGnDkRtpZJ7bhdLAdtazPBts/exec", 
            details, 
            async (res, status) => {
                console.log(res)
                console.log(status)
                let result = await JSON.parse(res);
                console.log(result)
                setLoad(false)
                if (result[0] === true) {
                    props.setFuFirstName(fName)
                    props.setFuLastName(lName)
                    props.setStage(1)
                    result[1] && props.setIsFUAndSF(true)
                    !result[1] && props.setIsFUAndIns(true)
                } else {
                    setFound(false)
                }
            });
    }

    return (
            <>
            {
                load ?
                    <Loading /> :
                <>
                <div className='fu-page'>
                    <div className="fu-border">
                        <div className='atBanner'>
                            <h1 
                                id="fu-title"
                                className="portal-title" 
                                >
                                    Patient Search
                            </h1>
                            <p>Help Us To Find You On Our System</p>
                        </div>
                        <hr className='hr' />
                        {
                            !found && <>
                                <h2 style={{color: 'red'}}>We weren't able to find your file.</h2>
                                <h3 style={{color: 'red'}}>Please check your details and try again or give us a call.</h3>
                                </>
                        }

                        <div className="fu-container">
                            <form className="bookingForm">
                                <label>
                                    First Name:
                                    <input 
                                        type="text" 
                                        value={fName} 
                                        onChange={(e) => setFName(e.target.value)} 
                                        placeholder="e.g. John"
                                        required 
                                        />
                                </label>
                                <label>
                                    Last Name:
                                    <input 
                                        type="text" 
                                        value={lName} 
                                        onChange={(e) => setLName(e.target.value)} 
                                        placeholder="e.g. Smith"
                                        required 
                                        />
                                </label>
                                <label>
                                    Date Of Birth:
                                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                                </label>
                                <input type="submit" className="submit-fu" value="search" onClick={(e: any) => handleSubmit(e)} />
                            </form>
                        </div>
                        <button
                            className="back-to-calendar"
                            onClick={() => props.setStage(0)}
                            >
                            Select A Different Appointment Type
                        </button> 
                    </div>
                </div>
                </>

            }
            </>
    )
}

export default FuFinder