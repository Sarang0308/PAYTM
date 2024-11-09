const mongoose=require("mongoose")


const uri = "replace with your link"; 

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Failed to connect to MongoDB Atlas", err));


const Userschema = mongoose.Schema({
    username : String,
    password : String,
    firstname : String,
    lastname : String
})
const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
const User = mongoose.model("User",Userschema);
const Account = mongoose.model("Account",accountSchema)

module.exports ={
    User,
    Account
}
