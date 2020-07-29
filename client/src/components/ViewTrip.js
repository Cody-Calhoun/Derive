import React, {useState, useEffect} from 'react'
import {Link} from '@reach/router'
import axios from 'axios'
import FlightList from './FlightList'

const ViewTrip = (props) => {

    const [trip, setTrip] = useState({})
    const [tabs, setTabs] = useState({
        fltTab: true,
        hotelTab: false,
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
                hotelTab: false,
                resTab: false
            })
        }
        else if(tabs.fltTab === false){
            setTabs({
                fltTab: true,
                hotelTab: false,
                resTab: false
            })
        }
    }

    return (
        <div className="container">
            <header className="viewTripHeader">
                <h1>{trip.title} Details</h1>
                <Link to='/trips'>All Trips</Link>
                <div class="d-flex justify-content-around">
                    <div class="p-2"><button onClick={fltTabClick} name="fltTab" value={tabs.fltTab}> Flights</button></div>
                    <div class="p-2">Flex item 2</div>
                    <div class="p-2">Flex item 3</div>
                </div>
            </header><hr/>
            <p><b>Description:</b> {trip.description} </p>
            
            {
                tabs.fltTab ?
                <FlightList  trip={trip} setTrip={setTrip}/>
                :
                ""
            }

            
        </div>
    )





}

export default ViewTrip
