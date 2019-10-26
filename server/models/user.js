import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String
});

// create the user model from schema
export const UserModel = mongoose.model('User', userSchema);
