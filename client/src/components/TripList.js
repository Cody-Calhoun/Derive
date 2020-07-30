import React, {useState, useEffect} from 'react'
import {Link} from '@reach/router'
import axios from 'axios'
import TripCalendar from './TripCalendar'
import 'react-calendar/dist/Calendar.css'



const TripList = () => {
    const [trip, setTrip] = useState({
        title: "", 
        description: "",
        startDate: "",
        endDate: ""
    })
    const [myTrips, setMyTrips] = useState([])

    const [count, setCount] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:8000/api/trips')
            .then(response =>{
                setMyTrips(response.data.results)
            })
            .catch(err => console.log(err))
    }, [count])

    const handleChange = e => {
        setTrip({
            ...trip,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/trips', trip)
            .then(response => {
                console.log(response.data)
                const [...triplist] = myTrips
                triplist.push(response.data.results)
                setMyTrips(triplist)
                setCount(count + 1)
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="box">
            <header >
                <h1>Welcome to your place of adventure</h1>
            </header><hr/>
            <div className="leftside">
            {
                myTrips.length > 0 ? 
                <div className="tripTable">
                    <h1>Planned Trips</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Trip Name</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myTrips.map((item, i) =>
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td><Link to={`/trip/${item._id}`}>{item.title}</Link></td>
                                    <td>{item.description}</td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                : 
                <h1>Currently no trips are planned.</h1>
            }
            <div className="addTrip">
                <h2>Add a Trip</h2><hr/>
                <form onSubmit={handleSubmit} className="col-sm-8">
                    <div className="form-group row">
                        <label htmlFor="title" >Title:</label><br/>
                        <input type="text" name="title" value={trip.title} onChange={handleChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="startDate" >Start Date:</label><br/>
                        <input type="date" name="startDate" value={trip.startDate} onChange={handleChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="endDate" >End Date:</label><br/>
                        <input type="date" name="endDate" value={trip.endDate} onChange={handleChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" >Description:</label><br/>
                        <input type="text" name="description" value={trip.description} onChange={handleChange} />
                    </div>
                    <div className="form-group row">
                        <input type="submit" value="Plan Trip"/>
                    </div>

                </form>
            </div>
            </div>

            <div className="calender">
                <TripCalendar events={myTrips}/>
            </div>
        </div>
    )
}

export default TripList
