import { useEffect, useState } from 'react'
import Paypal from '../Paypal/PayPal'
import './FinaliseFollowUp.css'

interface Props {
    type: string,
    setStage: (stage: number) => void,
    selectedTime: string,
    fuSubmit: (email: string, payInClinic: boolean) => void,
    isFUAndSF: boolean,
    isFUAndIns: boolean
}

const FinaliseFollowUp: React.FC<Props> = (props) => {
    const selectedDate = new Date(props.selectedTime).toString()
    const [fuEmail, setFuEmail] = useState<string>('');
    const [privacy, setPrivacy] = useState<boolean>(false);
    const [payInClinic, setPayInClinic] = useState<boolean>(false);

    const [price, setPrice] = useState<number>(0);

    //determine price from type
    useEffect(() => {
        props.type === 'KN-FU' ? setPrice(130) :
            props.type === 'ST-FU' && setPrice(90)
    }, [props.type])

    //submit function
    const submitFU = () => {
        //console.log('push')
        props.fuSubmit(fuEmail, payInClinic)
    }

    //if pay in clinic is selected, submit form
    useEffect(() => {
        payInClinic && submitFU()
    })

    return (
        <div className='fu-pay-container'>
            <h1 className="portal-title">Finalise Appointment</h1>
            <div className="fu-pay">
                <h2>You have selected {selectedDate.split(':00 GMT')[0]}</h2>
                <hr />
                <p>Please provide an email address to receive confirmation of your appointment.</p>
                <label className="fu-email-label">
                    <div className='fu-label'>Email:</div> <div className='requiredIcon'>*</div>
                    <input 
                        className="fu-email"
                        type="text" 
                        value={fuEmail} 
                        onChange={(e) => setFuEmail(e.target.value)} 
                        placeholder="e.g. example@example.com" 
                        required 
                        />
                </label>
                <label className="fu-email-label">
                    <div className='fu-label'>Privacy:</div> <div className='requiredIcon'>*</div>
                    <div className="checkbox-alignment">
                        <input 
                            name="privacy" 
                            type="checkbox" 
                            style={{appearance: 'auto', WebkitAppearance: 'checkbox', width: '30px', border: '1px solid var(--the-black)', margin: '0 15px'}}
                            checked={privacy} 
                            onChange={() => setPrivacy(!privacy)} 
                            required 
                            />
                        <p>By ticking this box you indicate that you have read and agree with our<a href="https://www.londonfootandanklesurgery.co.uk/about-us/privacy-policy/" target="_blank" rel="noreferrer">&nbsp;Privacy Policy&nbsp;</a></p>
                    </div>
                </label>
            {
                props.isFUAndIns ?
                    <button
                        className='fu-submit'
                        onClick={() => submitFU()}>
                            submit
                        </button> :
                (price !== 0 && fuEmail !== '' && privacy) &&
                <>
                    <p>Our records indicate that you are self funding.</p>
                    <p style={{width: '90%', margin: 'auto'}}>To complete your booking, please select whether to pay the fee of £{price} either now or in clinic.</p>
                    <button
                        className="fu-pay-in-clinic"
                        onClick={() => setPayInClinic(true)}
                        >
                            Pay In Clinic
                    </button>
                    <div className="fu-pp-container">
                        <Paypal
                            price={price}
                            description={
                                "Consultation with " + 
                                (props.type.indexOf('KN') >= 0 ? 
                                    "Mr. Kaser Nazir, Consultant Podiatric Surgeon" : 
                                        "Mr. Steven Thomas, Specialist Podiatrist")
                            }
                            paySubmit={() => submitFU()}
                            />
                    </div>
                </>
            }
            </div>
            <button
                    className="back-to-calendar"
                    onClick={() => props.setStage(1)}
                    >
                    Select A Different Time
            </button>  
        </div>
    )
}

export default FinaliseFollowUp