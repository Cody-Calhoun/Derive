import React, {useState} from 'react'
import Calendar from 'react-calendar'



const TripCalendar = (props) => {

    const [state, setState] = useState({
        date: new Date()
    })

    const handleChange = date => {
        setState({date})
    }


    return (
        <div>
            <Calendar onChange={handleChange} value={state.date}/>
            

        </div>
    )
}

export default TripCalendar
