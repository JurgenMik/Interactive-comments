import React, {useState, useEffect} from 'react';
import './App.scss';
import UserComment from "./components/UserComment/UserComment";
import Comments from "./components/Comments/Comments";
import data from './data.json';
import {Comment} from "./interfaces";

function App() {

    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState<Comment>({
        content: "",
        createdAt: "",
        score: 0,
        user: {
            image: {
                png: data.currentUser.image.png,
                webp: data.currentUser.image.webp
            },
            username: data.currentUser.username,
        },
        replies: []
    });

    useEffect(() => {
        setComments(data.comments);
    }, [])

  return (
      <div className="main-layout-container">
          <Comments
              comments={comments}
              profile={data.currentUser}
          />
          <UserComment
              setComment={setComment}
              setComments={setComments}
              comment={comment}
              comments={comments}
          />
      </div>
  );
}

export default App;
