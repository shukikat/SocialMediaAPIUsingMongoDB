import User from '../models/user.js';
import Thought from '../models/thought.js';
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        }
        else {
            res.json(thought);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new Thought
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought.id } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
            });
        }
        res.status(201).json(thought);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json({ message: 'Thought deleted successfully' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, // Use $addToSet to avoid duplicates
        { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Use $pull to remove the reaction
        { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
