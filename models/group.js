import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: String, required: true }],
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expenses: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      paidBy: { type: String, required: true },
      date: { type: Date, default: Date.now },
    }
  ]
});

export default mongoose.models.Group || mongoose.model('Group', groupSchema);
