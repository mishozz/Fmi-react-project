import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import librarySdk from "../../services/librarySdk";

const Comments = ({ user, currentUserId, bookIsbn }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) => {
    return backendComments
        .filter((backendComment) => backendComment.parentId === commentId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )};
  const addComment = async (text, parentId, referenceBookIsbn) => {
    try {
      const res = await librarySdk.addComment(text, parentId, referenceBookIsbn);
      setBackendComments([res, ...backendComments]);
      setActiveComment(null);
    } catch (e) {
      console.log(e);
    }
  };

  const updateComment =  async (text, commentId) => {
    try {
      await librarySdk.editComment(commentId, text)

      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment._id === commentId) {
          return { ...backendComment, content: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    } catch(e) {
      console.log(e)
    }
  };
  const deleteComment = async (commentId) => {

    if (window.confirm("Are you sure you want to remove comment?")) {
      try {
        await librarySdk.deleteComment(commentId);
  
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment._id !== commentId
        );
        setBackendComments(updatedBackendComments);
      } catch (e) {
        console.log(e)
      }
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await librarySdk.getComments();
        const filteredComments = res.comments.filter(comment => comment.referenceBookIsbn === bookIsbn);
        setBackendComments(filteredComments);
      } catch (e) {
        console.log(e)
      }
    }

    fetchComments();
  }, []);
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" 
        handleSubmit={(text) => addComment(text,null, bookIsbn)}
        user={user}
      />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            user={user}
            bookIsbn={bookIsbn}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
