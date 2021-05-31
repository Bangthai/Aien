const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/", (req,res)=>{
     res.sendFile(__dirname+"/signup.html")
})

app.post("/" , (req,res)=>{
    var firstName= req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url = "https://us19.api.mailchimp.com/3.0/lists/0b26d227cf";

    const options = {
        method:"POST",
        auth: "bangthai:6d261ab9e17ba05ae77f602e439901d3-us19"
    }

    const request = https.request(url, options ,function(response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        if(response.statusCode === 200 && req.body.email === "longshiraien@gmail.com"  &&req.body.fName ==="Bendangienla" && req.body.lName==="Longshir"){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html");
            
        }
    })

    request.write(jsonData);
    request.end();
    
})
app.listen( process.env.PORT || 3000, ()=>{
    console.log("Server is now listening on port 3000");
})
