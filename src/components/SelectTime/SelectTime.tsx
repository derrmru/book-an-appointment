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

    const dates: { [index: string]: string[] } = availability.reduce((dates, currentDate) => {
        const day: string = currentDate.split(', ')[0]
        const time: string = currentDate.split(', ')[1].split(':').slice(0, 2).join(':')
        dates[day] = [...(dates[day] ?? []), time]
        return dates
    }, {})

    const kees = Object.keys(dates);

    //async trigger search for dates beyond next month
    const dateListLength = kees.length;
    console.log('dateListLength=', dateListLength)
    useEffect(() => {
        if (inc >= dateListLength) setLoading(true)
    }, [inc, dateListLength])
    useEffect(() => {
        //if future hasn't loaded yet, trigger loading icon
        if (availability.length > 0) {
            const checkFinalDate = availability.length > 0 ? availability[availability.length - 1] : '';
            console.log('checkFinalDate=', checkFinalDate)
            console.log('availability=', availability)
            const newDate = checkFinalDate.split(', ')[0]
            const year = newDate.split('/')[2]
            const month = Number(newDate.split('/')[1]) - 1
            const day = newDate.split('/')[0]
            const time = checkFinalDate.split(', ')[1]
            const hours = time.split(':')[0]
            const minutes = time.split(':')[1]
            const finalDate = new Date(year, month, day, hours, minutes);
            console.log('finaldate=', finalDate)

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
        }
    }, [availability, setAvailability, type])

    //prevent increment upwards if finished finding times
    if ((new Date(availability[availability.length - 1]).getMonth() - new Date().getMonth()) >= 3 && inc >= dateListLength) {
        setInc(inc - 5)
    }

    const returnFutureDate = () => {
        if (dateListLength < 5) {
            return ' ' + kees[dateListLength - 1]
        } else if (dateListLength >= 5 && dateListLength < 10 && inc > 0) {
            return ' ' + kees[dateListLength - 1]
        } else if (dateListLength > 10 && (inc + 5) >= (dateListLength - 5)) {
            return ' ' + kees[dateListLength - 1]
        }
        return ' ' + kees[inc + 4]
    }

    const formatTime = (time: string) => {
        console.log('time', time)
        const split: string[] = time?.split(':') ?? []
        let minutes: string = split[1] ?? ''
        if (minutes.length === 1) {
            minutes += '0'
        }
        return `${split[0]}:${minutes}`
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
                                    {kees[inc] + ' '}
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
                                        key={date}
                                        className="date-headers"
                                    >
                                        <h3 className="date-axis">{`${date}`}</h3>
                                        <div className="times-container">
                                            {
                                                dates[date].reverse().map((time, j) => {
                                                    const shortTime = formatTime(time)
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