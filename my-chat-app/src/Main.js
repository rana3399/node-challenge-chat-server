import  {React, useEffect, useState} from 'react'

function Main() {

    const [messages , setMessages] = useState([])
    const [nameInputValue , setNameInputValue] = useState('')
    const [messageInputValue , setMessageInputValue] = useState('')
    const [messageContent, getMessageContent] = useState({
		from: '',
		text: '',
	});

    useEffect(()=>{
        fetch("http://localhost:3007/all-message")
        .then((res) => res.json())
        .then((data) =>{ 
           // console.log(data);
            return setMessages(data)
        })
        
    },[])

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
		fetch("http://localhost:3007/message", {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messageContent),
        
		}).then(
			fetch("http://localhost:3007/message")
				.then((res) => res.json())
				.then((data) => {
                    console.log(messageContent)
					setMessages(data);
				})
		);
		getMessageContent({ from: '', text: '' });
        console.log(messageContent)
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

    const handleLatest =()=>{
        console.log('I AM CLICKED');
        fetch("http://localhost:3007/latest")
        .then((res) => res.json())
        .then((data) =>{ 
            console.log(data);
            return setMessages(data)
        })
        
    }

    

    console.log();
    
    return (
    <div>
        <h1>CYF Chat</h1>
        <h2>Send a message</h2>
        
        <form action="/messages" method="post">
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
                placeholder="The message..."
                value = {messageInputValue}
                /><br />
            </p>
        
            <button 
            type="submit"
            onSubmit={onSubmitHandler}
            >Send
            </button>
        </form>

            <button onClick={handleLatest} >Latest Messages </button>

            {messages.map((message) =>{
                return (
                   <div className="message-container">
                    <ul >
                        <li>
                            From: {message.from} <br />
                            Message: {message.text}
                            Time : {message.time}
                            
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