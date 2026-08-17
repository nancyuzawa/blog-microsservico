import { useState } from "react";
import './CommentCreate.css';

const CommentCreate = ({ postId }) => {
    const [addComment, setAddComment] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!addComment.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/comments_client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: postId,
                    comment: addComment
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Sucesso ao criar comentário:', data);
            setAddComment('');
        } catch (error) {
            console.log('Erro ao criar comentário: ', error);
        }
    };

    return (
        <div className="container-add-comentario">
            <form onSubmit={onSubmit}>
                <input
                    value={addComment}
                    onChange={(e) => setAddComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="input-comment"
                />
                <button type="submit" className="btn-comment">Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;