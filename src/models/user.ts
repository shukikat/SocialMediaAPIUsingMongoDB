import { Schema, model, Document } from 'mongoose';


interface IUser extends Document {
  username: string;
  email: Date;
  thoughts: []//something with thoughts;
  friends: []// something with friends at user model;
 
}

// Schema to create Post model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      default: false,
      //need to be unique and trimmed
    },
    email: {
      type: String,
      //need to unique trimmed match valid email address validator,
    },
  
    thoughts: {
      type: [],
      //needs to be id values referencing thoughts
      
    },
   friends
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
