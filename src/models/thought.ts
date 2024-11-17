import { Schema, Types, Document, ObjectId } from 'mongoose';

interface IThoughts extends Document { 
  thiughtText: string;
  createdAt: Date;
  username: string;
  reaction:[];
}

const thoughtSchema = new Schema<IThoughts>(
  {
    thoughtText: {
      type: String,
      maxlength: 280, 
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //need a getter method for time stamp
    },
    

    username{
        type:String, 
        //needs to be required

    }, 
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

export default thoughtSchema;
