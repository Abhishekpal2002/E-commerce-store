const mongoose = require("mongoose")


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        
       

    }catch(err){
        console.log(err)
        
    }
}

// mongoose
//   .connect(
//     `mongodb+srv://Abhishek:abHi4455@cluster0.bwhvj53.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
      
//     }
//   )
//   .then(() => {
//     console.log("Database connected");
//   });

// }
module.exports = connectDB