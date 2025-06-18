import type { IComment } from "../types/types"
import PostItemCommentsItem from "./PostItemCommentsItem"

const PostItemComments = ({ comments, replyHandler }: { comments: IComment[], replyHandler: Function }) => {
   return (
      <div className="pb-3 h-96 overflow-scroll flex flex-col gap-5">
         {!comments.length && <p className="text-sm text-color-primary-text opacity-60 pt-5">No one has commented yet, be the first!</p>}

         {comments && comments.map(item => (
            <PostItemCommentsItem {...item} replyHandler={replyHandler} />
         ))}
      </div>
   )
}

export default PostItemComments