const express = require("express");
const cors = require("cors");
const fs = require("fs")
const allMessagesFromJson = require("./all-messages.json");
//const { parse } = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const globalMessagesFile = "./all-messages.json"

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system express!",
};

const messages = [welcomeMessage]

// get All the messages from JSON file OnLoad
// get the latest messages whe button is clicked.




// ----------POST--------------

const saveNewMessagesToJson = (jsonText)=>{
  const text = JSON.stringify(jsonText, null, 4)
  fs.writeFileSync(globalMessagesFile, text)

}

const getNewMessagesFromJson =()=>{
  const read = fs.readFileSync(globalMessagesFile)
  const obj =  JSON.parse( read)

console.log(obj);
  return obj;
}

const messageContent = getNewMessagesFromJson();

const saveMessage = (req, res )=>{
  const newMessage = req.body

  console.log('this the message body ' + req.body);
  const allMessages = getNewMessagesFromJson() //  ??


  allMessages.push(newMessage)
  saveNewMessagesToJson(allMessages)
  console.log( allMessages);
  res.status(201).send(newMessage)

}


// const getNewMessages = (req, res)=>{
//   const inputMessage = req.body
//   const {id, from, text} = inputMessage;

  
//     const maxId = Math.max(...messages.map((message) => message.id))
//     const incrementId  = maxId + 1;
  

//       if(from == "" || text == ""){
//         return res.status(400).send("Please fill all the sections")
//       }else{
//         messages.push({
//           id: incrementId,
//           from: from,
//           text: text,
//           time : new Date().toLocaleTimeString()
//         })

//         return res.status(201).send(messages[messages.length - 1])
  
//       }

     
// }


// ----------GET ALL MESSAGE--------------
const getAllMessages = (req, res)=>{
  res.send(messageContent)
}

// ----------GET MESSAGE BY ID--------------
const getMessageById = (req, res )=>{
  const reqId = parseInt(req.params.id)

  const findMatchedId = globalMessagesFile.find((message) => message.id === reqId)
  //console.log(findMatchedId);

  if(findMatchedId){
    return res.send( findMatchedId)
  }else{
    res.status(404).send("Could not find the message! ")
  }
  
}

// ----------Delete MESSAGE BY ID--------------
const deleteMessageById=(req, res)=>{
  const reqId = parseInt( req.params.id)
  
  const findMatchedId = (message)=> {
    console.log( message.id);
   return  message.id === reqId
  } 


  const indexOfId =  messageContent.findIndex(findMatchedId)

  console.log(indexOfId);

  messageContent.splice(indexOfId, 1)
  console.log('deleted message ID IS: ' + reqId);
  
  saveNewMessagesToJson(messageContent)
  
  return res.send(messageContent)

}

const getLatestMessage =(req, res)=>{

    const latestMessage =  messageContent.slice(-1)
    console.log(latestMessage);
     return res.send(latestMessage)
}

// -----------------"Read" Functionality--------------
const getSearchFunc = (req, res)=>{
  const value = req.query.text
  console.log(value);

  let messageText = messages.filter((message) =>  message.text.includes(value))

   if(messageText){
     console.log('----------' +  messageText);
     return res.send(messageText)
   }else{
     return res.status(400).send( "Could not find")
   }
}


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/message", saveMessage)
app.get("/all-message", getAllMessages) // getting all messages from the json file
app.get("/message/:id", getMessageById)
app.get("/latest", getLatestMessage) // found latest messages
app.delete("/message/:id", deleteMessageById)
app.get("/search", getSearchFunc)


app.listen(3007, () => {
   console.log("Listening on port 3007")
  });
