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
            price: '£250',
            code: 'KN-NP'
        },
        {
            title: 'Follow Up Consultation',
            consultant: 'Mr. Kaser Nazir',
            specialism: 'Consultant Podiatric Surgeon',
            description: 'Follow Up Appointment',
            price: '£175',
            code: 'KN-FU'
        },
        {
            title: 'New Consultation',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Initial In-Clinic Appointment',
            price: '£150',
            code: 'ST-NP'
        },
        {
            title: 'Follow Up Consultation',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Follow Up Appointment',
            price: '£120',
            code: 'ST-FU'
        },
        {
            title: 'Initial consultation and Gait analysis',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Initial consultation and gait analysis (If you are using Bupa or AXA PPP please contact us directly to arrange)',
            price: '£220',
            code: 'GAIT-NP'
        },
        {
            title: 'Follow up appointment with Gait Analysis',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Gait analysis (follow up patient)',
            price: '£220',
            code: 'GAIT-FU'
        },
        {
            title: 'Ingrown Toenail Removal',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Toenail Excision Package ( one nail) - Includes 3 post operative follow up appointments, as needed.',
            price: '£747',
            code: 'ST-IGTN'
        },
        {
            title: 'Ingrown Toenail Removal to two toes',
            consultant: 'Mr. Steven Thomas',
            specialism: 'Specialist Podiatrist',
            description: 'Toenail Excision Package ( two nails) - Includes 3 post operative follow up appointments, as needed.',
            price: '£947',
            code: 'ST-IGTN2'
        },
        {
            title: 'Ingrown Toenail Removal',
            consultant: 'Mr. Kaser Nazir',
            specialism: 'Consultant Podiatric Surgeon',
            description: 'Toenail Excision Package (one nail) - Includes 3 post operative follow up appointments, as needed.',
            price: '£886',
            code: 'KN-IGTN'
        },
        {
            title: 'Ingrown Toenail Removal to two toes',
            consultant: 'Mr. Kaser Nazir',
            specialism: 'Consultant Podiatric Surgeon',
            description: 'Toenail Excision Package (two nails) - Includes 3 post operative follow up appointments, as needed.',
            price: '£1086',
            code: 'KN-IGTN2'
        },
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
                            <h3 style={{ marginBottom: '10px' }}>{appointment.consultant},<br /> {appointment.specialism}</h3>
                            <h4 style={{ fontWeight: 100, margin: '0' }}>Self-Funding Fee: {appointment.price}</h4>
                            <h4 style={{ fontWeight: 100, margin: '0' }}>Private Health Insurance Is Accepted</h4>
                            <h5 style={{ marginTop: '10px', fontWeight: 100 }}>{appointment.description}</h5>
                        </div>
                    </button>
                })
            }
        </div>
    )
}

export default AppointmentType