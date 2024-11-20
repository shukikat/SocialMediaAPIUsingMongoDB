import mongoose from 'mongoose';
//install dotenv
//add the local hosl when 
//
mongoose.connect(process.env.MONGODB_URI || '', {
//useNewUrlParser: true,
//useUnifiedTopology: true,
});
export default mongoose.connection;
