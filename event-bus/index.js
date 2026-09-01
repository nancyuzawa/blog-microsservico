import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('Event received from post or comments ', event);
    sendEvent(4000, event); // porta do Posts
    sendEvent(4001, event); // porta dos Comentarios
    sendEvent(4002, event); //query centraliza os comentarios e os posts
})

app.listen(4005, () => {
    console.log('Event bus listening on port 4005.');
});

const sendEvent = async (port, event) => {
    try{
        const response = await fetch(`http://localhost:${port}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        if(!response.ok){
            throw new Error(`Error on resquest ${port} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Data received: ', data);
    } catch (error) {
        console.error(`Error on request ${port}: ${error}`);
    }
}
