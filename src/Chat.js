import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {apiBaseUrl} from './BackendUrls'
import {HubConnectionBuilder, LogLevel, HttpTransportType} from '@microsoft/signalr'

const Chat = () => {
    const [connection, setConnection] = useState(null)
    const [events, setEvents] = useState([])
    const lastEvent = useRef(null)

    lastEvent.current = events
    let foo = {
        username: 'vuser',
        password:'kalimera'
    }
    let payload = {
        eventId: "10",
        eventStartTime: "2020-12-08T07:40:34.879Z",
        feedCode: "PA_HR_IN",
        eventType: "string",
        eventStatus: "Parading"
    }
    console.log('URL is',apiBaseUrl)

//     useEffect(()=>{
//         axios.post(apiBaseUrl+'hubs/events')
//         //axios.post('https://api.exchangeratesapi.io/latest?base=USD', {
//         //    headers: {"Access-Control-Allow-Origin": "*"}
//    // })
//         .then(resp => {
//           if(resp.status === 200){
//             // call auth function from context provider
//             console.log('ALL IS GOOD')
//           }
//         })
//         .catch(error => {
//           console.log('Chat.js | axios request error status!',error)
//         })

       
//      },[])

    
 
    useEffect(()=>{
        const newConnection = new HubConnectionBuilder()
            .withUrl(apiBaseUrl+'hubs/events')
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Error)
            .build();

            setConnection(newConnection)
    },[])

    useEffect(() => {
        if(connection){
            connection.start()
                .then(result => {
                    console.log('Connected!')
                    connection.on('ReceiveUpcomingEvents', event => {
                        const updatedEvent = [...lastEvent.current]
                        updatedEvent.push(event)

                        setEvents(updatedEvent)
                    })
                })
                .catch(error => console.warn('Chat.js | Error establishing connection'))
        }
    },[connection])


    return (
        <>
            <h1>Hello chat</h1>
            {console.log('Events',events[0])}
        </>
    )
}

export default Chat