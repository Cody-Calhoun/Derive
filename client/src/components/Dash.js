import React, {useState} from 'react'
import axios from 'axios'
import moment from 'moment'

const Dash = props => {
    const [flight, setFlight] = useState({})
    const [details, setDetails] = useState({
        num: "",
        airline: ""
    })
    const {fltList, setFltList} = props

    const handleSubmit = e => {
        e.preventDefault();
        axios.get(`http://api.aviationstack.com/v1/flights?access_key=13b0b31156be2db15d07101f25d2faba&flight_number=${details.num}&airline_name=${details.airline}`)
            .then(response =>{
                console.log(response.data.data[0])
                setFlight(response.data.data[0])
                const [...flts] = fltList;
                flts.push(response.data.data[0]);
                setFltList(flts)
                console.log(flight)
            })
            .catch(err => console.log(err))
    }
    const handleChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }





    return (
        <div>
            <form className="col-sm-10" onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="num"  className="col-sm-4"> Flight Number</label>
                    <input type="text" name="num" value={details.num} onChange={handleChange} className="col-sm-6 form-control"/>
                </div>
                <div className="form-group row">
                    <label htmlFor="airline" className="col-sm-4"> Airline</label>
                    <input type="text" name="airline" value={details.airline} onChange={handleChange} className="col-sm-6 form-control"/>
                </div>
                <div className="form-group row">
                    <input type="submit" value="Submit" className="col-sm-4"/>
                </div>
            </form>

            {/* <div>
                <h3>Current flight on Deck</h3>
                {
                    flight ? 
                    <div>{
                        flight.flight_status === "scheduled" ?
                        <ul>
                            <li>Date: {flight.flight_date}</li>
                            <li>Departing from: {flight.departure.airport} @ {moment.utc(flight.departure.estimated).format(moment.HTML5_FMT.TIME_SECONDS)}</li>
                            <li>Arriving at: {flight.arrival.airport} @ {moment.utc(flight.arrival.estimated).format(moment.HTML5_FMT.TIME_SECONDS)}</li>
                        </ul>
                        : ""
                        }</div>
                        : ""
                }
            </div> */}

                {
                    fltList ?
                <div>
                    <h3>Flight list</h3>
                    <ul>
                        {
                            fltList.map((flight, i) =>
                                <li key={i}> Flight Status: {flight.flight_status}
                                    <ul>
                                        <li>Date: {flight.flight_date}</li>
                                        <li>Departing from: {flight.departure.airport} @ {moment.utc(flight.departure.estimated).format(moment.HTML5_FMT.TIME_SECONDS)}</li>
                                        <li>Arriving at: {flight.arrival.airport} @ {moment.utc(flight.arrival.estimated).format(moment.HTML5_FMT.TIME_SECONDS)}</li>
                                    </ul>
                                    <hr/>
                                </li>
                            )
                        }
                    </ul>
                </div>
                    : ""
                }
        </div>
    )
}

export default Dash
