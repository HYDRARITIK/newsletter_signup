const express=require("express");
const app=express() //function that represent express module

const axios=require("axios")
const bodyParser=require("body-parser")
const mailchimp=require('mailchimp')
const https=require("https")
app.use(bodyParser.urlencoded({extended:true}));

const {api_key,listId}=require("./secrets")


//to send static file
//for files we have to specify path relative to static folder
app.use(express.static("static_folder"))


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")

})




app.post("/",(req,res)=>{


const form_obj=req.body
const fname=form_obj.first_name
const lname=form_obj.Last_name
const email=form_obj.inputEmail
const password=form_obj.inputPassword

const data_obj={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }

    ]
};



const data_string=JSON.stringify(data_obj);





// const axios = require('axios')
const url='https://us9.api.mailchimp.com/3.0/lists/'+listId;
const options={
    method:"POST",
    auth:"hydra:"+api_key
}


const request=https.request(url,options,(response)=>{
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
    }
})

request.write(data_string)

request.end()









// axios.post(url_endpoint, data_obj)
//   .then(function (response) {
//     console.log(response);
//   }).catch((err)=>{
//     console.log(err);
//   })



// async function run() {
//     const response = await mailchimp.lists.addListMember(listId, {
//     email_address: email,
//     status: "subscribed",
//     merge_fields: {
//     FNAME: fname,
//     LNAME: lname
// }




//If all goes well logging the contact's id


// res.sendFile(__dirname + "/success.html")
// console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);

//Running the function and catching the errors (if any)

// run().catch(e => res.sendFile(__dirname + "/failure.html"));


});


app.post("/failure",(req,res)=>{
    res.redirect("/")
})



app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running on port 5000");
    //browser is sending request to our server in response server
    //have to send something
});







