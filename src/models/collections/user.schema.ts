

import { ERole } from '@/enums/role.enum';
import { baseSchema, Schema } from './base/base.schema';




export const UserSchema = Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 256
    },
    role: {
      type: String,
      enum: ERole,
      default: ERole.NORMAL
    },
    refeshToken: {
      type: String
    }
  },
  {
    collection: 'users'
  },
  baseSchema
)
