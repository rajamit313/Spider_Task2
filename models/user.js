import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  mobile: {type: Number, length: 10},
  profilepic: { type: String, default: '/defaultprofilepic.png' },
  friends: [{ type: String }], 
  friendRequest: [{type: String}],
}, { timestamps: true }, {collection: 'user'});

export default mongoose.models.User || mongoose.model('User', userSchema);
