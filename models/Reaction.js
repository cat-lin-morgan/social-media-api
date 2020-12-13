const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            require: 'Your reaction must have one or more characters.',
            max: 280,
        },
        username: {
            type: String,
            require: 'You must put your username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

module.exports = ReactionSchema;