import { useEffect, useState } from 'react'
import $ from 'jquery'
import codes from '../../appointmentCodes/appointmentCodes'
import Searching from '../Searching/Searching'
import './SelectTime.css'

interface Props {
    availability: any[],
    timeSelect: (date: string, time: string) => void,
    setStage: (stage: number) => void,
    type: string,
    setAvailability: (result: any[]) => void
}

const SelectTime: React.FC<Props> = ({
    availability,
    timeSelect,
    setStage,
    type,
    setAvailability
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    //inc - increment through received dates in sections of five
    const [inc, setInc] = useState<number>(0);

    let dates: { [index: string]: string[] } = {};
    availability.map((item: string) => {
        const date = item.split(',')[0];
        const time = item.split(' ')[1] + ' ' + item.split(' ')[2];
        if (dates[date]) {
            return dates[date].push(time)
        } else {
            return dates[date] = [time]
        }
    })

    const kees = Object.keys(dates);

    //async trigger search for dates beyond next month
    const l = kees.length;
    useEffect(() => {
        if (inc >= l) setLoading(true)
    }, [inc, l])
    useEffect(() => {
        //if future hasn't loaded yet, trigger loading icon
        const finalDate = new Date(availability[availability.length - 1]);
        //console.log(finalDate)
        if (finalDate.getMonth() < (new Date().getMonth() + 4)) {//the '3' is how many months ahead to search for
            $.post(codes[type]['url'],
                { date: new Date(finalDate.getFullYear(), finalDate.getMonth(), finalDate.getDate() + 1, 0, 0), appointmentLength: codes[type]['length'], type: type },
                async (res) => {
                    let result = await JSON.parse(res);
                    const temp: any[] = [...availability, ...result]
                    setLoading(false)
                    setAvailability(temp)
                })
        }
    }, [availability, setAvailability, type])

    //prevent increment upwards if finished finding times
    if ((new Date(availability[availability.length - 1]).getMonth() - new Date().getMonth()) >= 3 && inc >= l) {
        setInc(inc - 5)
    }

    const returnFutureDate = () => {
        if (l < 5) {
            return ' ' + new Date(kees[l - 1]).toDateString()
        } else if (l >= 5 && l < 10 && inc > 0) {
            return ' ' + new Date(kees[l - 1]).toDateString()
        } else if (l > 10 && (inc + 5) >= (l - 5)) {
            return ' ' + new Date(kees[l - 1]).toDateString()
        }
        return ' ' + new Date(kees[inc + 4]).toDateString()
    }

    return (
        <div className="dates-container">
            <h1 className="portal-title">Select A Date And Time</h1>
            <div className="dates">
                {
                    loading ?
                        <Searching /> :
                        <>
                            <div className="span-header">
                                <button
                                    className="inc-button"
                                    onClick={() => inc >= 5 && setInc(inc - 5)}
                                >
                                    &#8592;
                                    </button>
                                <h3 className="date-range">
                                    {new Date(kees[inc]).toDateString() + ' '}
                                                -
                                            {
                                        returnFutureDate()
                                    }
                                </h3>
                                <button
                                    className="inc-button"
                                    onClick={() => setInc(inc + 5)}
                                >
                                    &#8594;
                                    </button>
                            </div>
                            <hr style={{ width: '80%', margin: '15px 10%' }} />
                            {
                                kees.map((date, i) => {
                                    return (i >= inc && i < (inc + 5)) && <div
                                        key={'date' + i}
                                        className="date-headers"
                                    >
                                        <h3 className="date-axis">{new Date(date).toLocaleDateString().split(',')[0]}</h3>
                                        <div className="times-container">
                                            {
                                                dates[date].reverse().map((time, j) => {
                                                    const shortTime = time.split(':')[0] + ':' + time.split(':')[1] + ' ' + time.split(' ')[1];
                                                    return <button
                                                        key={'time' + j}
                                                        className="times"
                                                        onClick={() => timeSelect(date, time)}
                                                    >
                                                        {shortTime}
                                                    </button>
                                                })
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </>
                }
            </div>
            <button
                className="back-to-calendar"
                style={{ marginBottom: '100px' }}
                onClick={() => setStage(0)}
            >
                Back To Appointment Types
                        </button>
        </div >
    )
}

export default SelectTime