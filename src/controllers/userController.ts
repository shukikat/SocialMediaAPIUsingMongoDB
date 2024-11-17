import User from '../models/user.js';
import { Request, Response } from 'express';

  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
         res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.status(201).json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId },req.body, {new:true});

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user); 
      
    } catch (err) {
      res.status(500).json(err);
      
    }
  }


  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated apps deleted!' })
    
    } catch (err) {
      res.status(500).json(err);
      
    }
  }