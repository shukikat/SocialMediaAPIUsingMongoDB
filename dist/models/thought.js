import { Schema, model, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //default: ()=> new Date(), 
        //get: (value: any)=> new Date(value).toISOString(),//
    },
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //get: (value: any)=> new Date(value).toISOString(),
        // getter method for time stamp
    },
    username: {
        type: String,
        required: true,
        //needs to be required
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
