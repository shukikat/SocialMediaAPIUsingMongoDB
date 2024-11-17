import { Schema, model, Types, Document } from 'mongoose';

interface IThoughts extends Document { 
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions:IReaction[];
}

interface IReaction extends Document { 
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt:Date;
  
}

const thoughtSchema = new Schema<IThoughts>(
  {
    thoughtText: {
      type: String,
      required: true, 
      maxlength: 280, 
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date)=> timestamp.toISOString(),
      // getter method for time stamp
    },
    

    username: {
        type:String, 
        required: true, 
        //needs to be required

    }, 

    reactions: [{
      reactionId: {
        type: Schema.Types.ObjectId, 
        default: ()=> new Types.ObjectId(), 
      }, 

      reactionBody: {
        type:String, 
        required: true, 
        maxlength: 280, 
      }, 

      username: {
        type:String, 
        required: true, 
      }, 

      createdAt: {
        type: Date, 
        default: Date.now, 
        get: (timestamp: Date)=> timestamp.toISOString(),
      }, 

    }
  
  ]

  },

  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);




thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  const Thought=model('thoughts', thoughtSchema);

export default Thought;
