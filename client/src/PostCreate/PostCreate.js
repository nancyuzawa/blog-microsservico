import React, { useState } from "react";
import './PostCreate.css'

const PostCreate = () => {
    const [title, setTitle] = useState('Post');

    const onSubmit = async (event) => {
        event.preventDefault(); //para não ficar apagando
        console.log('Cheguei no onSubmit.');

        try {
            const response = await fetch('http://localhost:4000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title}),
        });
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Sucess:', data);
        } catch (error) {
            console.log("Erro: ", error)
        }
        setTitle('');
    }

    return(
        <div className="post-create">
            <h1>Create a Post</h1>
            <form onSubmit={onSubmit}>
                <div className="form">
                    <label>Tile</label>
                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="field"
                    />
                </div>
                <button className="button">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate;