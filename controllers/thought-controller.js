
const { User, Thoughts } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            })
    },
    //get one thought by id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status.json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },
    //create a new thought
    createThoughts({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(( thoughtData ) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    //update though by id,
    updateThoughts({ params, body }, res) {
        Thoughts.findByIdAndUpdate({ _id: params.id }, body, { new: true })
            .then(({ _id }) => {
                return User.create(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    //remove thought by id
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    //create a new reaction
    createReaction({ params, body }, res) {
        // console.log('params', params);
        // console.log('body', body);
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    },
    //remove reaction
    deleteReaction({ params }, res) {
        console.log(params);
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: { _id : params.reactionId } } },
            { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;