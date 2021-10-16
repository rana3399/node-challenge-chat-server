import  {React, useEffect, useState} from 'react'

function Main() {
    const [messages , setMessages] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3007/all-message")
        .then((res) => res.json())
        .then((data) =>{ 
            console.log(data);
            return setMessages(data)
        })
        
    },[])

    const handleLatest =()=>{
        console.log('I AM CLICKED');
        fetch("http://localhost:3007/latest")
        .then((res) => res.json())
        .then((data) =>{ 
            console.log(data);
            return setMessages(data)
        })


        // return setMessages( [
        //     {
        //         id : 10,
        //         from: 'RANA',
        //         text: "New message"
        //     }
        // ] )
        
        
    }
    
    return (
    <div>
        <h1>CYF Chat</h1>
        <h2>Send a message</h2>
        
        <form action="/messages" method="post">
            <p>
                Name: <input type="text" name="from" placeholder="Your Name" /> <br />
                Message: <input type="text" name="text" placeholder="The message..." />
                <br />
            </p>
        
            <button 
            type="submit"
            >Send
            </button>
        </form>

            <button onClick={ handleLatest} >Latest Messages </button>

            {messages.map((message) =>{
                return (
                   <div className="message-container">
                    <ul >
                        <li>
                            From: {message.from} <br />
                            Message: {message.text}
                            Time : {message.time}
                            
                        </li><span><button>Delete</button></span>
                    </ul> 
                   </div>
                )
            })}


        
    </div>
    )
}

export default Main