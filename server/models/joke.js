const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    label: { type: String, required: true }, 
    value: { type: Number, default: 0 } 
});

const jokeSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    votes: { 
        type: [voteSchema], 
        default: [  
            { label: "😂", value: 0 },
            { label: "👍", value: 0 },
            { label: "❤️", value: 0 }
        ]
    },
    availableVotes: { type: [String], default: ["😂", "👍", "❤️"] }
});

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = mongoose.model('Joke', jokeSchema);
