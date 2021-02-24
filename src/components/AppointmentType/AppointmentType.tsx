import './AppointmentType.css'

interface Props {
    selectType: (s: string) => void
}

const AppointmentType: React.FC<Props> = (props) => {

    const appointments = [
        {
            title: 'New Consultation',
            consultant: 'Mr. Kaser Nazir',
            specialism: 'Consultant Podiatric Surgeon',
            description: 'Initial In-Clinic Appointment',
            price: '£200',
            code: 'KN-NP'
        },
        {
            title: 'Follow Up Consultation',
            consultant: 'Mr. Kaser Nazir',
            specialism: 'Consultant Podiatric Surgeon',
            description: 'Follow Up Appointment',
            price: '£130',
            code: 'KN-FU'
        },
        {
            title: 'New Consultation',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Initial In-Clinic Appointment',
            price: '£120',
            code: 'ST-NP'
        },
        {
            title: 'Follow Up Consultation',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Follow Up Appointment',
            price: '£90',
            code: 'ST-FU'
        }
    ]

    return (
        <div className="appointment-container">
            <h1 className="portal-title mobile-title">London Foot & Ankle Surgery</h1>
            <h2 className="adaptable-title">Select An Appointment Type</h2>
            {
                appointments.map((appointment, i) => {
                    return <button 
                        key={'appoint' + i}
                        data-testid="appointmentType"
                        className="appointment-card"
                        onClick={() => props.selectType(appointment.code)}
                        >
                        <div className="card-section">
                            <h2>{appointment.title}</h2>
                            <hr className="card-hr" />
                            <h3 style={{marginBottom: '10px'}}>{appointment.consultant},<br /> {appointment.specialism}</h3>
                            <h4 style={{fontWeight: 100, margin: '0'}}>Self-Funding Fee: {appointment.price}</h4>
                            <h4 style={{fontWeight: 100, margin: '0'}}>Private Health Insurance Is Accepted</h4>
                            <h5 style={{marginTop: '10px', fontWeight: 100}}>{appointment.description}</h5>
                        </div>
                    </button>
                })
            }
        </div>
    )
}

export default AppointmentType