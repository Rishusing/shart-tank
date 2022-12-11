const mongoose = require('mongoose')

const pitchSchema = new mongoose.Schema(
  {
    entrepreneurId: {
      type: String,
    },
    pitchTitle: {
      type: String,
    },
    pitchIdea: {
      type: String,
    },
    askAmount: {
      type: String,
    },
    equity: {
      type: String,
    },
    likes: [
      {
        likerId: {
          type:String,
        },
        likerName: {
          type:String,
        }
      }
    ],
    offers: [
      {
        investorId: {
          type: String,
        },
        amount: {
          type: String,
        },
        equity: {
          type: String,
        },
        comment: {
          type: String,
        },
        date: {
            type: Date,
            default : new Date()
        }
      }
    ]
  },
  {
    timestamps: true,
  },
)

const Pitch = mongoose.model('pitch', pitchSchema)
module.exports = Pitch
