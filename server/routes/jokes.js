const express = require('express');
const axios = require('axios');
const router = express.Router();
const Joke = require('../models/joke');

const NUMBER_OF_JOKES = 10;


router.get('/fetch-jokes', async (req, res) => {
    try {

        for (let i = 0; i < NUMBER_OF_JOKES; i++) {

            const response = await axios.get('https://teehee.dev/api/joke');
            const joke = response.data;


            if (!joke || !joke.question || !joke.answer) {
                console.warn(`Invalid joke format received:`, joke);
                continue;
            }


            const exists = await Joke.findOne({ question: joke.question });

            if (!exists) {
                await Joke.create({
                    question: joke.question,
                    answer: joke.answer,
                    votes: [
                        { label: "😂", value: 0 },
                        { label: "👍", value: 0 },
                        { label: "❤️", value: 0 }
                    ],
                    availableVotes: ["😂", "👍", "❤️"]
                });

            }
        }

        res.json({ message: `Jokes saved successfully!` });
    } catch (error) {
        console.error('Error fetching jokes:', error);
        res.status(500).json({ error: 'Failed to fetch jokes' });
    }
});

router.get('/', async (req, res) => {
    try {
        const count = await Joke.countDocuments();
        if (count === 0) {
            return res.status(404).json({ error: 'No jokes found' });
        }

        const randomIndex = Math.floor(Math.random() * count);
        const randomJoke = await Joke.findOne().skip(randomIndex);

        res.json(randomJoke);
    } catch (error) {
        console.error('Error fetching random joke:', error);
        res.status(500).json({ error: 'Failed to fetch a random joke' });
    }
});


module.exports = router;

