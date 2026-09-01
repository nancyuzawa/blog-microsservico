import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Data structure
const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.get('/posts/:id/comments', (req, res) => {
    const post = posts[req.params.id];

    if(!post) {
        return res.status(404).send({
            msg: 'Post não encontrado.'
        });
    }
    res.send(post.comments)
})

//Evento recebido do event bus
app.post('/events', (req, res) => {
    console.log('Post route from Query Service');
    console.log('Content: ', req.body);
    const {type} = req.body;

    if (type === 'PostCreated') {
        const { id, title } = req.body;
        posts[id] = { id, title, comments: []};
    }
    
    if (type === 'CommentCreated') {
        const { id, content, postId } = req.body;
        const post = posts[postId];
        post.comments.push({id, content});
    }
    res.send({msg: `Event ${type} received and treated`});
    console.log(JSON.stringify(posts, null, 2));
});


app.listen(4002, () => {
    console.log('Query service listening on 4002!');
})
