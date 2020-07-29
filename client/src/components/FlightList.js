import React, {useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Link} from '@reach/router'


const FlightList = (props) => {
    const {trip, setTrip} = props
    const [flight, setFlight] = useState({
        num: "",
        airline: "",
        status: "",
        date: "",
        departure: "",
        arrival: ""
    })
    const [details, setDetails] = useState({
        num: "",
        airline: ""
    })
    

    const handleChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.get(`http://api.aviationstack.com/v1/flights?access_key=13b0b31156be2db15d07101f25d2faba&flight_number=${details.num}&airline_name=${details.airline}`)
            .then(response =>{
                const mainflt = response.data.data[0]
                const hold = {
                    num: mainflt.flight.number,
                    airline: mainflt.airline.name,
                    status: mainflt.flight_status,
                    date: mainflt.flight_date,
                    departure: `Departing from ${mainflt.departure.airport} @ ${moment.utc(mainflt.departure.estimated).format(moment.HTML5_FMT.TIME_SECONDS)}`,
                    arrival: `Arriving at ${mainflt.arrival.airport} @ ${moment.utc(mainflt.arrival.estimated).format(moment.HTML5_FMT.TIME_SECONDS)}`
                }
                setFlight(hold)
                console.log(hold)
                axios.patch(`http://localhost:8000/api/trips/${trip._id}/flight`, hold)
                    .then(response => {
                        setTrip(response.data.results)
                        setDetails({
                            num: "",
                            airline: ""
                        })
                    })
                    .catch(err => console.log(err))
                
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            {
                trip.flights && trip.flights.length !== 0 ?
                <div className="flightBox">
                    <h3>Flights</h3>
                    <div className="list-group">
                        {
                            trip.flights.map((item, i)=>
                            <div key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1"><b>Date: </b> {item.date} <b>Airline: </b> {item.airline}</h5>
                                <small>{item.status}</small>
                                </div>
                                <p className="mb-1">{item.departure}</p>
                                <p className="mb-1">{item.arrival}</p>
                            </div>
                            )
                        }
                    </div>
                    <div>
                        <h2>Add Flights</h2>
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
                    </div>
                </div>
                
                :
                <div>
                    <h2>Add Flights</h2>
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
                </div>
            }
            
        </div>
    )
}

export default FlightList
