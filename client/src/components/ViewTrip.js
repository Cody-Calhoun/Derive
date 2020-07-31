import React, {useState, useEffect} from 'react'
import {Link, navigate} from '@reach/router'
import axios from 'axios'
import FlightList from './FlightList'
import MapComp from './MapComp'

const ViewTrip = (props) => {

    const [trip, setTrip] = useState({})
    const [tabs, setTabs] = useState({
        fltTab: true,
        mapTab: false,
        resTab: false
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trips/${props.id}`)
            .then(response=>{
                if(response.data.message === 'success'){
                    setTrip(response.data.results)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const fltTabClick = e =>{
        if(tabs.fltTab === true){
            setTabs({
                fltTab: false,
                mapTab: false, 
                resTab: false
            })
        }
        else if(tabs.fltTab === false){
            setTabs({
                fltTab: true,
                mapTab: false,
                resTab: false
            })
        }
    }

    const mapTabClick = e =>{
        if(tabs.mapTab === true){
            setTabs({
                fltTab: false,
                mapTab: false, 
                resTab: false
            })
        }
        else if(tabs.mapTab === false){
            setTabs({
                fltTab: true,
                mapTab: false,
                resTab: false
            })
        }
    }

    return (
        <div className="container">
            <header className="viewTripHeader">
                <h1>{trip.title} Details</h1>
                <Link to='/trips'>All Trips</Link>
                <div className="d-flex justify-content-around">
                    <div className="p-2"><button onClick={fltTabClick} name="fltTab" value={tabs.fltTab}> Flights</button></div>
                    <div className="p-2"><button onClick={e => {navigate("/explore")}} name="mapTab" value={tabs.mapTab}> Explore</button></div>
                    <div className="p-2">Hotels</div>
                </div>
            </header><hr/>
            <p><b>Description:</b> {trip.description} </p>
            
            {
                tabs.fltTab ?
                <FlightList  trip={trip} setTrip={setTrip}/>
                :
                ""
            }

            {
                tabs.mapTab ?
                <MapComp />
                :
                ""
            }

        </div>
    )
}

export default ViewTrip
