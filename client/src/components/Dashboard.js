import React, {useEffect} from 'react'
import axios from 'axios'

const Dashboard = () => {
    const user = localStorage.getItem("token")

    useEffect(() => {
        var pers = localStorage.getItem("token")
        console.log(pers.id)
    }, [])
    return (
        <div>
            <h1>This is Dashboard</h1>
        </div>
    )
}

export default Dashboard
