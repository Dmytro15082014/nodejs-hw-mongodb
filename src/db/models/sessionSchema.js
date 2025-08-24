import { model, Schema, Types } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, unique: true },
    accessToken: { type: String, requires: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionsCollection = model('sessions', sessionSchema);
