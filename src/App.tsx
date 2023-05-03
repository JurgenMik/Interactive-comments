import React, {useState, useEffect} from 'react';
import './App.scss';
import UserComment from "./components/UserComment/UserComment";
import Comments from "./components/Comments/Comments";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import data from './data.json';
import {Comment} from "./interfaces";

function App() {

    const [comments, setComments] = useState<Comment[]>([]);
    const [selected, setSelected] = useState<object | null>(null);

    useEffect(() => {
        setComments(data.comments);
    }, [])

    const handleSelectedComment = (content: string, identifier: string, targetComment: string | null) => {
        setSelected({
            content: content,
            targetComment: targetComment,
            interaction_type: identifier
        });
    }

  return (
      <div className="main-layout-container">
          {selected &&
              <DeleteModal
                  selected={selected}
                  setViewModal={setSelected}
                  setComments={setComments}
                  comments={comments}
              />
          }
          <Comments
              comments={comments}
              profile={data.currentUser}
              setComments={setComments}
              handleSelectedComment={handleSelectedComment}
          />
          <UserComment
              setComments={setComments}
              profile={data.currentUser}
              comments={comments}
          />
      </div>
  );
}

export default App;
