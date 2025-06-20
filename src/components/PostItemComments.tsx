import axios from "axios"
import type { IComment, ICommentThree, ILike } from "../types/types"
import PostItemCommentsItem from "./PostItemCommentsItem"
import { API_URL } from "../services/apiUrl"
import { useEffect, useState } from "react"

const PostItemComments = ({ comments, replyHandler }: { comments: IComment[], replyHandler: Function }) => {
   const [dangerousAlert, setDangerousAlert] = useState<string>('')
   const [filtredComments, setFiltredComments] = useState<ICommentThree[] | undefined>([])

   const getCommentLikes = async (comment: IComment) => {
      try {
         const res = await axios.get(`${API_URL}likes?commentId=${comment.id}`)

         if (res.data) {
            const resFiltred = res.data.filter((item: ILike) => !item.postId)
            return resFiltred.length
         }
      } catch (err) {
         setDangerousAlert('Cant fetch comments')
      }
   }

   const commentsAddLikes = (comments: IComment[]) => {
      return comments.map(async (item) => ({
         ...item,
         likes: await getCommentLikes(item)
      }))
   }

   const createCommentsThree = (comments: ICommentThree[], parentId?: string): ICommentThree[] => {
      return comments.filter(item => item.replyId === parentId).map((item) => ({
         ...item,
         replyComment: createCommentsThree(comments, item.id)
      }))
   }

   useEffect(() => {
      const threeCommentsHandler = async () => {
         setFiltredComments(createCommentsThree(await Promise.all(commentsAddLikes(comments))).sort((a, b) => b.likes - a.likes))
      }

      threeCommentsHandler()
   }, [])

   return (
      <div className="pb-3 h-96 overflow-scroll animate-fade__in">
         {dangerousAlert && <p className="alert_dangerous">{dangerousAlert}</p>}
         {!comments.length && <p className="text-sm text-color-primary-text opacity-60 pt-5">No one has commented yet, be the first!</p>}

         {filtredComments && filtredComments.map(item => (
            <PostItemCommentsItem key={item.id} {...item} replyHandler={replyHandler} />
         ))}
      </div>
   )
}

export default PostItemComments