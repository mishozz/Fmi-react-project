import CommentForm from "./CommentForm";
import { Avatar } from "@material-ui/core";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
  user,
  bookIsbn
}) => {

  const isEditing =
    activeComment &&
    activeComment._id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment._id === comment._id &&
    activeComment.type === "replying";

  const canUserDeleteOrEdit = () => {
    if(!user) {
      return false;
    }
    return user.email === comment.from;
  }

  const canDelete = canUserDeleteOrEdit();
  const canEdit = canUserDeleteOrEdit();

  const replyId = parentId ? parentId : comment._id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div key={comment._id} className="comment">
      <div className="comment-image-container">
        <Avatar><div>{comment.from.substring(0, 2)}</div></Avatar>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.from}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.content}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.content}
            handleSubmit={(text) => updateComment(text, comment._id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
            user={user}
          />
        )}
        <div className="comment-actions">
          <div
            className="comment-action"
            onClick={() => {
              setActiveComment({ _id: comment._id, type: "replying" })
            }}
            >
              Reply
          </div>
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ _id: comment._id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) =>  {
              addComment(text, replyId, bookIsbn)
            }}
            user={user}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply._id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment._id}
                replies={[]}
                currentUserId={currentUserId}
                user={user}
                bookIsbn={bookIsbn}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
