import { useState, useEffect } from "react";
import './CommentList.css';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/posts/${postId}/comments`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.log("Erro ao buscar comentários: ", error);
        }
    };

    useEffect(() => {
        if (postId) {
            fetchComments();
        }
    }, [postId]);

    const renderedComments = comments.map((comment) => {
        return (
            <li key={comment.id} className="comment-item">
                {comment.comment}
            </li>
        );
    });

    return (
        <div className="container-lista-comentario">
            <h4 className="comment-count">{comments.length} comentário(s)</h4>
            <ul className="comment-list-items">
                {renderedComments}
            </ul>
        </div>
    );
};

export default CommentList;