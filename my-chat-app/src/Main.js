import  {React, useEffect, useState} from 'react'

function Main() {
    // const [postId , setPostId] = useState("")

    // const handleClick =()=>{
    //     console.log('I AM CLICKED');
    //     fetch("http://localhost:3007/message")
    //     .then((res) => res.json())
    //     .then((data) =>{ 
    //         console.log(data);
    //         return setPostId(data)
    //     })
        
    // }


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

        <a href="http://localhost:3007/all-message">See all messages</a>
    </div>
    )
}

export default Main