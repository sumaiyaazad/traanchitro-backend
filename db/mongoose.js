const mongoose = require('mongoose')


const connection=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongoose: connected to database')
    }
   catch(e){
        console.log("mongoose: error in database connection ",e);
   }
}
module.exports=connection;