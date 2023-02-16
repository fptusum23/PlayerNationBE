

import { baseSchema, Schema } from './base/base.schema';




export const NationSchema = Schema(
  {
    name: {
      type: String,
      require: true,
      uniqued: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    }
  },
  {
    collection: 'nations'
  },
  baseSchema
)
