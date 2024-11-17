import { Schema, model, Document, Types } from 'mongoose';


interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
 
}

// Schema to create Post model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,  
      
    },
    email: {
      type: String,
      required: true, 
      unique: true, 
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
     
    },
  
    thoughts: {
      type: [Types.ObjectId],
      ref: 'Thought'
     
      
    },
   friends: {
    type:[Types.ObjectId], 
    ref: 'User', 
  }, 
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const Users = model('user', userSchema);

export default Users;
