import React, {useState} from 'react'
import {Inject,ScheduleComponent,Day, Week, Month,Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'

const Scheduler = () => {

    const [localData, setLocalData] = useState([{
        EndTime: new Date(2020, 7, 31, 12, 0),
        StartTime: new Date(2020, 7, 31, 15, 0)
    }])

    
    return (
        <div>
            <ScheduleComponent currentView='Month' eventSettings={{ dataSource: localData }}>
                <Inject services={[Day, Week, Month, Agenda]}/>

            </ScheduleComponent>
        </div>
    )
}

export default Scheduler
