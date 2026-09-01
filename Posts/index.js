import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import { error } from 'console';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors())

const posts = [];

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', async (req, res) => {
    if(!req.body || !req.body.title) {
        return res.status(400).send(
            {
                error:'O campo title é obrigatório!'
            }
        )
    }
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    const newPost = {id, title};
    posts.push(newPost);

    try {
        const response = await fetch('http://localhost:4005/events', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({type: 'PostCreated', id, title})
        });
        if(!response.ok) {
            throw new Error('Request error on 4005: ', response.statusText)
        }
        const data = await response.json();
        console.log('Response from 4005 ', data);
    } catch (error) {
        console.error('Error request. Port 4005', error) // Porta do event-bus
    }
    res.status(201).send(newPost);
})

app.post('/events', (req, res) => {
    console.log('Received event: ', req.body);
    res.send({});
})

app.listen(4000, () => {
    console.log('Posts service listening on 4000!');
})
