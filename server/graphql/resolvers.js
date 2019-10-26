import { UserModel } from '../models/user'

export const resolvers = {
    
  Query: {
    getUsers: () => UserModel.find()
  },

  Mutation: {
    createUser: async (_, {name}) => {
      const newUser = new UserModel({name});
      console.log(newUser)
      return await newUser.save();
    }
  }
  
};