const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const ThoughtsSchema = new Schema(
    {
        thoughtText : {
            type: String,
            require: 'Ur thoughts make u yu',
            min: [1, 'Needs one or more characters'],
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: dateFormat
        },
        username: {
            type: String,
            require: 'You must add your username!'
        },
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
    return  this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;
