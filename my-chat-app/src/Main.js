import  {React, useEffect, useState} from 'react'

function Main() {
    const [messages , setMessages] = useState([]);
    const [nameInputValue , setNameInputValue] = useState('')
    const [messageInputValue , setMessageInputValue] = useState('')

    useEffect(()=>{
        fetch("http://localhost:3007/all-message")
        .then((res) => res.json())
        .then((data) =>{ 
           // console.log(data);
            return setMessages(data)
        })
      
    },[])

    // const submitNewMessage =(event)=>{
    //     event.preventDefault();
        
    //     fetch("http://localhost:3007/message")
    //     .then((res) => res.json())
    //     .then((data) =>{ 
    //        // console.log(data);
    //         return setMessages(data)
    //     })
    // }

    const getNameValue =(event)=>{
        console.log(event.target.value);
        setNameInputValue(event.target.value)
    }

    const getMessageValue =(event)=>{
        console.log(event.target.value);
        setMessageInputValue(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const url = "http://localhost:3007/message"

		fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                from: nameInputValue,
                text: messageInputValue
            }),
        
		}).then((res) => res.json())
        .then((data)=> {
            console.log(data)
            return setMessages(data);
        })

        setNameInputValue('')
        setMessageInputValue('')
        
	};

    const deleteItem = (id) =>{
        fetch(`http://localhost:3007/message/${id}`, {
            method: "DELETE"
        })    

        .then((response) => response.json() )
        .then((data) => {
           return setMessages(data)
        })
    }

    // GET LATEST/LAST MESSAGE
    const handleLatest =()=>{
        console.log('I AM CLICKED');
        fetch("http://localhost:3007/latest")
        .then((res) => res.json())
        .then((data) =>{ 
            console.log(data);
            return setMessages(data)
        })      
    }
   
    return (
    
    <div className="main-container">
        <h1>CYF Chat</h1>
        <h2>Send a message</h2>  

        <form onSubmit={onSubmitHandler}>
            <p>Name: 
                <input 
                onChange = {getNameValue}
                type="text" 
                name="from" 
                placeholder="Your Name"
                value = {nameInputValue}
                /> <br />
                Message: 
                <input 
                onChange = {getMessageValue}
                type="text" 
                name="text" 
                placeholder="message..."
                value = {messageInputValue}
                /><br />
            </p>
          
        </form>
            <div className="btn-group">
                <button type="submit">Send</button>
                <button onClick={handleLatest} >Latest Messages </button>
            </div>

            {messages.map((message) =>{
                return (
                   <div className="message-container">
                    <ul >
                        <li>
                            From: {message.from} <br />
                            Message: {message.text}
                            {/* Time : {message.time}   */}
                        </li>
                        <span><button onClick={()=> deleteItem(message.id)} >Delete</button></span><br />
                        <span><button>  Edit</button></span>
                    </ul> 
                   </div>
                )
            })}        
    </div>
    )
}

export default Main