import { useState } from 'react';
import $ from 'jquery';
import codes from './appointmentCodes/appointmentCodes';
import Sidebar from './components/Sidebar/Sidebar';
import Loading from './components/Loading/Loading';
import AppointmentType from './components/AppointmentType/AppointmentType';
import FuFinder from './components/FuFinder/FuFinder';
import SelectTime from './components/SelectTime/SelectTime';
import BookingForm from './components/BookingForm/BookingForm';
import FinaliseFollowUp from './components/FinaliseFollowUp/FinaliseFollowUp';
import Completion from './components/Completion/Completion';
import './App.css';

function App() {
  const [stage, setStage] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [startDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<[]>([]);
  const [selected, setSelected] = useState<string>('');
  
  //state to handle follow up appointments
  const [isFUAndSF, setIsFUAndSF] = useState<boolean>(false);
  const [isFUAndIns, setIsFUAndIns] = useState<boolean>(false);
  const [fuFirstName, setFuFirstName] = useState<string>('');
  const [fuLastName, setFuLastName] = useState<string>('');

  //handle selection of appointment type
  const selectType = (s: string) => {
    setType(s)
    setIsFUAndSF(false); //reset in case there is a lot of navigation back and forth
    setIsFUAndIns(false); //reset in case there is a lot of navigation back and forth
    if (s.indexOf('FU') >= 0) {
      setStage(4)
      $.post(codes[s]['url'], 
        { date: startDate, appointmentLength: codes[s]['length'], type: s }, 
          async (res) => {
              let result = await JSON.parse(res);
              setAvailability(result)
              setLoad(false)
            })
    } else if (s.indexOf('NP') >= 0) {
      setLoad(true);
        $.post(codes[s]['url'], 
          { date: startDate, appointmentLength: codes[s]['length'], type: s }, 
            async (res) => {
                let result = await JSON.parse(res);
                setAvailability(result)
                setStage(1)
                setLoad(false)
              })
    }
  }

  //handle time selection
  const timeSelect = (date: string, time: string) => {
    setSelected(date + ', ' + time);
    (isFUAndSF || isFUAndIns) ? setStage(5) :
        setStage(2)
  }

  //handle submission of new appointments
  const handleSubmit = (firstName: string, lastName: string, telephone: string, email: string, address: string, mop: string, policy: string, auth: string, dob: string, gpAddress: string, privacy: boolean, payInClinic: boolean) => {
    setLoad(true)
    const sTime = new Date(selected)
    //console.log(sTime)
    const details = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        telephone: telephone,
        email: email, 
        address: address,
        mop: mop,
        policy: policy,
        auth: auth,
        dob: dob,
        gpAddress: gpAddress,
        privacy: privacy,
        year: sTime.getFullYear(),
        month: sTime.getMonth(),
        date: sTime.getDate(),
        hours: sTime.getHours(),
        minutes: sTime.getMinutes(),
        appointmentType: type, 
        payInClinic: payInClinic
    }
    $.post(process.env.REACT_APP_SUBMIT_NP, //make sure to replace with production endpoint after development
        details, 
        async (res) => {
            setStage(3)
            setLoad(false)
            }).done(() => {
                console.log('complete')
            });
  }

  //handle submission of follow up appointments
  const fuSubmit = (email: string, payInClinic: boolean) => {
    const sTime = new Date(selected);
    const details = {
      firstName: fuFirstName.trim(),
      lastName: fuLastName.trim(),
      year: sTime.getFullYear(),
      month: sTime.getMonth(),
      date: sTime.getDate(),
      hours: sTime.getHours(),
      minutes: sTime.getMinutes(),
      appointmentType: type, 
      email: email, 
      payInClinic: payInClinic.toString()
    }
    console.log(details)
    setLoad(true)
    $.post(process.env.REACT_APP_SUBMIT_FU, //make sure to replace with production endpoint after development
        details, 
        async (res) => {
          console.log(res)
            setStage(3)
            setLoad(false)
            }).done(() => {
                console.log('complete')
            });
  }

  return (
    <div className="App">
      <Sidebar 
        stage={stage}
        title="Book An Appointment"
        />
        <div className="portal">
          {
            load === true ?
              <Loading /> :
              stage === 0 ?
                <AppointmentType 
                  selectType={(s: string) => selectType(s)}
                  /> :
                stage === 1 ?
                  <SelectTime 
                    availability={availability}
                    timeSelect={(date: string, time: string) => timeSelect(date, time)}
                    setStage={(stage: number) => setStage(stage)}
                    type={type}
                    setAvailability={(result: any) => setAvailability(result)}
                    /> :
                  stage === 2 ?
                    <>
                      <BookingForm 
                        setStage={(stage: number) => setStage(stage)}
                        selectedTime={selected}
                        handleSubmit={(firstName: string, lastName: string, telephone: string, email: string, address: string, mop: string, policy: string, auth: string, dob: string, gpAddress: string, privacy: boolean, payInClinic: boolean) => handleSubmit(firstName, lastName, telephone, email, address, mop, policy, auth, dob, gpAddress, privacy, payInClinic)}
                        type={type}
                        /> 
                    </> :
                    stage === 3 ?
                      <Completion /> :
                      stage === 4 ?
                        <>
                          <FuFinder 
                            setStage={(stage: number) => setStage(stage)}
                            setIsFUAndSF={(x: boolean) => setIsFUAndSF(x)}
                            setIsFUAndIns={(y: boolean) => setIsFUAndIns(y)}
                            setFuFirstName={(fName: string) => setFuFirstName(fName)}
                            setFuLastName={(lName: string) => setFuLastName(lName)}
                            />
                        </> :
                        stage === 5 &&
                          <FinaliseFollowUp 
                            type={type}
                            setStage={(stage: number) => setStage(stage)}
                            selectedTime={selected}
                            fuSubmit={(email: string, payInClinic: boolean) => fuSubmit(email, payInClinic)}
                            isFUAndSF={isFUAndSF}
                            isFUAndIns={isFUAndIns}
                            />
          }
        </div>

    </div>
  );
}

export default App;