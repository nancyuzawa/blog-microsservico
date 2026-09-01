// import logo from './logo.svg';
import './App.css';
import PostCreate from "./PostCreate/PostCreate";
import PostList from "./PostList/PostList";

function App() {
  return (
    <div className="App">
      <PostCreate/>
      <h1 className="title-post">Confira os Posts abaixo:</h1>
      <PostList/>
    </div>
  );
}

export default App;
