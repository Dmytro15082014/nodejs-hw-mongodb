import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}?$',
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Users = model('users', userSchema);
