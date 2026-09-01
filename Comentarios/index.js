import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors())

const comments_client = [];

// Listar todos os comentários
app.get('/comments_client', (req, res) => {
    res.send(comments_client);
});


// Listar comentários de um post específico
app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params;

    const commentsFound = comments_client.filter((comment) => {
        return comment.postId === id;
    });

    res.send(commentsFound);
});


// Criar um comentário
app.post('/comments_client', async (req, res) => {
    if (!req.body || !req.body.comment || !req.body.postId) {
        return res.status(400).send({
            error: 'É necessário preencher todos os campos!'
        });
    }

    const id = randomBytes(4).toString('hex');
    const { postId, comment } = req.body;
    const newComment = {
        id,
        postId,
        comment
    };

    comments_client.push(newComment);

    
    //minha adição
    try {
        const response = await fetch('http://localhost:4005/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'CommentCreated', 
                id, 
                postId, 
                content: comment
            })
        })
        if(!response.ok) {
            throw new Error('Request error on 4005: ', response.statusText)
        }
        const data = await response.json();
        console.log('Response from 4005 ', data);
    } catch (error) {
        console.error('Error request. Port 4005', error) // Porta do event-bus
    }
    res.status(201).send(newComment);
});

//minha adição
app.post('/events', (req, res) => {
    console.log('Received event: ', req.body);
    res.send({});
})

app.listen(4001, () => {
    console.log('Comments service listening on PORT: 4001!');
});
