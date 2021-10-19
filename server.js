const express = require("express");
const cors = require("cors");
const fs = require("fs")
const allMessagesFromJson = require("./all-messages.json");

const app = express();

app.use(cors());
app.use(express.json());

const globalMessagesFile = "./all-messages.json"

// ----------POST--------------

const saveNewMessagesToJson = (jsonText)=>{
  const text = JSON.stringify(jsonText, null, 4)
  fs.writeFileSync(globalMessagesFile, text)
}

const getNewMessagesFromJson =()=>{
  const read = fs.readFileSync(globalMessagesFile)
  const obj =  JSON.parse(read)
  return obj;
}

const messageContent = getNewMessagesFromJson();

const saveMessage = (req, res )=>{
  const newMessage = req.body


  let maxId = Math.max(...messageContent.map((message) => message.id))

  let incrementId = maxId + 1


  const {id, from, text }  = newMessage;


  messageContent.push({
    id: incrementId,
    from: from,
    text: text
  })
  saveNewMessagesToJson(messageContent)
  //console.log( messageContent);
  
  res.status(201).send({
    id: incrementId,
    from: from,
    text: text,
    Time: new Date().toLocaleTimeString()
  })

}


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
   return  message.id === reqId
  } 


  const indexOfId =  messageContent.findIndex(findMatchedId)

  messageContent.splice(indexOfId, 1)

  saveNewMessagesToJson(messageContent)
  
  return res.send(messageContent)

}

const getLatestMessage =(req, res)=>{

    const latestMessage =  messageContent.slice(-1)
    //console.log(latestMessage);
     return res.send(latestMessage)
}

// --------PUT--------------------

const updateMessage=(req, res)=>{
  const reqId = parseInt(req.params.id)
  console.log(parseInt(req.params.id));

  //const newInputMessage = req.body
  //console.log(req.body);

  const found = messageContent.find((message) => message.id == reqId) 
  console.log(found);

  let {id, from, text } = found

  id = req.body.id,
  from = req.body.from,
  text = req.body.text
  
  saveNewMessagesToJson(found)

  res.send({
    id: reqId,
    from: req.body.from,
    text: req.body.text
  })
}

// -----------------"Read" Functionality--------------
const getSearchFunc = (req, res)=>{
  const value = req.query.text
  console.log(value);

  let messageText = messageContent.filter((message) =>  message.text.includes(value))

   if(messageText){
     console.log(messageText);
     return res.send(messageText)
   }else{
     return res.status(400).send( "Could not find")
   }
}


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/message", saveMessage) // 
app.get("/all-message", getAllMessages) // getting all messages from the json file
app.get("/message/:id", getMessageById)
app.get("/latest", getLatestMessage) // found latest messages
app.delete("/message/:id", deleteMessageById) // DONE
app.get("/search", getSearchFunc)
app.put("/message/:id", updateMessage) // done


app.listen(3007, () => {
   console.log("Listening on port 3007")
  });
