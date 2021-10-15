const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system express!",
};

const messages = [welcomeMessage]

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.



// ----------POST--------------

const getNewMessages = (req, res)=>{
  const inputMessage = req.body
  const {id, from, text} = inputMessage;

  
    const maxId = Math.max(...messages.map((message) => message.id))
    const incrementId  = maxId + 1;
  

      if(from == "" || text == ""){
        return res.status(400).send("Please fill all the sections")
      }else{
        messages.push({
          id: incrementId,
          from: from,
          text: text
        })
  
        //console.log(messages);
        return res.status(201).send(messages[messages.length - 1])
  
      }
}

// ----------GET ALL MESSAGE--------------
const getAllMessages = (req, res)=>{
 const allMessages = messages.map((message) => message)
 res.send(allMessages)
 //console.log(allMessages);
}

// ----------GET MESSAGE BY ID--------------
const getMessageById = (req, res )=>{
  const reqId = parseInt(req.params.id)

  const findMatchedId = messages.find((message) => message.id === reqId)
  //console.log(findMatchedId);

  if(findMatchedId){
    return res.send(findMatchedId)
  }else{
    res.status(404).send("Could not find the message! ")
  }
  
}

// ----------Delete MESSAGE BY ID--------------
const deleteMessageById=(req, res)=>{
  const reqId = parseInt( req.params.id)
  
  const findMatchedId = (message)=> {
   return  message.id === reqId
  } 

  //console.log(findMatchedId);

  const indexOfId =  messages.findIndex(findMatchedId)


  //console.log(indexOfId);

  messages.splice(indexOfId, 1)
  //console.log('deleted message ID IS: ' + reqId);
  return res.send(messages)

}


// -----------------"Read" Functionality--------------
const getSearchFunc = (req, res)=>{
  const value = req.query.text
  console.log('THIS IS THE Value ' + value);

  let messageText = messages.filter((message) =>  message.text)

   if(messageText.includes("express")){
     console.log('----------' +  messageText);
     return res.send(message)
   }else{
     return res.status(400).send( "Could not find")
   }
}

app.get("/search", getSearchFunc)


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/message", getNewMessages)
app.get("/all-message", getAllMessages)
app.get("/message/:id", getMessageById)
app.delete("/message/:id", deleteMessageById)


  



app.listen(3007, () => {
   console.log("Listening on port 3007")
  });
