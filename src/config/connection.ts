import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGODB_URI || '') , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


export default mongoose.connection;



//install dotenv
//add the local hosl when 
//

//mongoose.connect(process.env.MONGODB_URI || '', {

   