

import { EPosition } from '@/enums/position.enum';
import { baseSchema, DataTypes, Schema } from './base/base.schema';




export const PlayerSchema = Schema(
  {
    name: {
      type: String,
      max: 255,
      required: [true, "Name can not be blank"],
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    club: {
      type: String,
      max: 255,
      required: true,
      trim: true
    },
    position: {
      type: String,
      enum: EPosition,
      required: true,
      trim: true
    },
    goals: {
      type: Number,
      min: 0,
      default: 0,
    },
    isCaptain: {
      type: Boolean,
      default: false
    },
    nation: {
      type: DataTypes.ObjectId,
      ref: 'nations',
      required: ['true', 'Player must be have nation']
    }
  },
  {
    collection: 'players'
  },
  baseSchema
)
