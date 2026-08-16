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

app.post('/posts', (req, res) => {
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
    res.status(201).send(newPost);
})

app.listen(4000, () => {
    console.log('Posts service listening on 4000!');
})