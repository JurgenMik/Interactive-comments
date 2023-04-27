import React, {useState, useEffect} from 'react';
import './App.scss';
import UserComment from "./components/UserComment/UserComment";
import data from './data.json';
import {Comment} from "./interfaces";

function App() {

    const [comments, setComments] = useState<any>([]);
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
