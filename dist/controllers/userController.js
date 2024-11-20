import User from '../models/user.js';
import Thought from '../models/thought.js';
//get all user
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
//get single user by id
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.status(201).json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
//find user by :id
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
//detee a user by id -- need to also delete all thoughts associated with it 
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        if (user.thoughts.length > 0)
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated apps deleted!' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to avoid duplicates
        { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, // Use $pull to remove the friend
        { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
//need delete thoughts
//
