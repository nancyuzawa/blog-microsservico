import { useEffect, useState } from "react";
import './PostList.css';
import CommentCreate from "../CommentCreate/CommenteCreate";
import CommentList from "../CommentList/CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    //Receber o conteúdo que está no backend
    const fetchPosts = async () => {
        try {
            // const response = await fetch('http://localhost:4000/posts');
            const response = await fetch('http://localhost:4002/posts');
            const data = await response.json();
            console.log("Response: ", data);
            setPosts(data);
        } catch (error) {
            console.log("Erro ao buscar posts: ", error)
        }
    }

    useEffect( () => { fetchPosts(); }, [])

    const renderedPosts = Object.values(posts).map((post) => {
        return (
            <div className="post-container" key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    {/* //vou precisar criar o frontend para: Comment Creat e Comment List */}

                    {/* Espaço para adicionar um novo comentário dentro de um determinado post */}
                    <CommentCreate postId={post.id} />

                    {/* Espaço em que vai ser listado os comentários adicionados */}
                    <CommentList postId={post.id} />


                </div>
            </div>
        )
    })

    return (
        <div className="post-list">
            {renderedPosts}
        </div>
    )
}

export default PostList;
