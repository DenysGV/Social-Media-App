import { useEffect, useState } from "react"
import { useCreateLikeMutation, useDeleteLikeMutation } from "../services/likesApi"
import { useGetUserByIdQuery } from "../services/usersApi"
import type { ICommentThree, ILike, IUser } from "../types/types"
import timeAgo from "../utils/timeAgo"
import { useAppSelector } from "../store/hooks"
import axios from "axios"
import { API_URL } from "../services/apiUrl"

interface IPostItemCommentsItemProps extends ICommentThree {
   replyHandler: Function,
}

const PostItemCommentsItem = ({ userId, text, createTimestamp, id, replyHandler, replyComment, likes }: IPostItemCommentsItemProps) => {
   const { data } = useGetUserByIdQuery(userId)
   const userOfComment: IUser | undefined = data
   const [createLike] = useCreateLikeMutation()
   const [deleteLike] = useDeleteLikeMutation()
   const [isLiked, setIsLiked] = useState<ILike | null>(null)
   const [showComments, setShowComments] = useState<boolean>(false)
   const user: IUser | null = useAppSelector((state) => state.user.user)

   const likeHandler = async () => {
      if (user) {
         if (isLiked) {
            await deleteLike(isLiked.id)
            setIsLiked(null)
         } else {
            const newLike: ILike = {
               id: `${new Date().getTime()}`,
               commentId: id,
               userId: user.id
            }

            await createLike(newLike)
            setIsLiked(newLike)
         }
      }
   }

   const isLikedHandler = async () => {
      if (user) {
         const res = await axios.get(`${API_URL}likes?commentId=${id}&userId=${user.id}`)
         const resFiltred = res.data.filter((item: ILike) => !item.postId)

         if (resFiltred.length) {
            setIsLiked(resFiltred[0])
            return
         }
      }

      setIsLiked(null)
   }

   useEffect(() => {
      isLikedHandler()
   }, [user])

   return (
      <div>
         <div className="p-3 bg-color-secondary-bg rounded-2xl mt-5 animate-fade__in">
            <div className="flex gap-2 items-center cursor-pointer w-fit">
               <div className="w-8 h-8 rounded-full">
                  <img className="w-full h-full" src="/user-logo.png" alt="user logo" />
               </div>
               <div>
                  <div className="flex gap-2">
                     <p className="text-sm text-color-primary-text">{userOfComment?.name}</p>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-color-highlight"></div>
                        <p className="text-color-highlight text-xxs">{timeAgo(createTimestamp)}</p>
                     </div>
                  </div>
               </div>
            </div>
            <p className="text-sm pt-2 pb-3 text-color-primary-text">{text}</p>
            <div className="flex justify-between">
               <div className="flex gap-5">
                  <p onClick={() => { replyHandler(userOfComment?.username, id) }} className="text-xs text-color-primary-text opacity-80 cursor-pointer">Reply</p>
                  {replyComment && !!replyComment.length && <div onClick={() => { setShowComments(prev => !prev) }} className="flex items-center gap-1">
                     <p className="text-xs text-color-primary-text opacity-80 cursor-pointer">Answers ({replyComment?.length})</p>
                     <svg className={`transition ${showComments && 'rotate-180'}`} width="15" height="8" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-color-primary-text" d="M1 1L8.5 8.5L16 1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>}
               </div>
               <div className="flex items-center gap-1">
                  {!isLiked && <svg onClick={() => { likeHandler() }} className="cursor-pointer" width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path className="stroke-color-primary-text" d="M11.5 7.93104C11.5 7.93104 11.5 7.66669 10.7717 6.70835C9.92833 5.59669 8.6825 4.79169 7.1875 4.79169C4.80125 4.79169 2.875 6.71794 2.875 9.10419C2.875 9.99544 3.14333 10.8196 3.60333 11.5C4.37958 12.6596 11.5 20.125 11.5 20.125M11.5 7.93104C11.5 7.93104 11.5 7.66669 12.2283 6.70835C13.0717 5.59669 14.3175 4.79169 15.8125 4.79169C18.1988 4.79169 20.125 6.71794 20.125 9.10419C20.125 9.99544 19.8567 10.8196 19.3967 11.5C18.6204 12.6596 11.5 20.125 11.5 20.125" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>}
                  {isLiked && <svg onClick={() => { likeHandler() }} className="cursor-pointer" width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M11.5 7.93098C11.5 7.93098 11.5 7.66663 10.7717 6.70829C9.92833 5.59663 8.6825 4.79163 7.1875 4.79163C4.80125 4.79163 2.875 6.71788 2.875 9.10413C2.875 9.99538 3.14333 10.8195 3.60333 11.5C4.37958 12.6595 11.5 20.125 11.5 20.125M11.5 7.93098C11.5 7.93098 11.5 7.66663 12.2283 6.70829C13.0717 5.59663 14.3175 4.79163 15.8125 4.79163C18.1988 4.79163 20.125 6.71788 20.125 9.10413C20.125 9.99538 19.8567 10.8195 19.3967 11.5C18.6204 12.6595 11.5 20.125 11.5 20.125" fill="#FF0000" />
                     <path d="M11.5 7.93098C11.5 7.93098 11.5 7.66663 10.7717 6.70829C9.92833 5.59663 8.6825 4.79163 7.1875 4.79163C4.80125 4.79163 2.875 6.71788 2.875 9.10413C2.875 9.99538 3.14333 10.8195 3.60333 11.5C4.37958 12.6595 11.5 20.125 11.5 20.125C11.5 20.125 18.6204 12.6595 19.3967 11.5C19.8567 10.8195 20.125 9.99538 20.125 9.10413C20.125 6.71788 18.1988 4.79163 15.8125 4.79163C14.3175 4.79163 13.0717 5.59663 12.2283 6.70829C11.5 7.66663 11.5 7.93098 11.5 7.93098Z" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>}
                  <p className="text-xxs text-color-primary-text">{likes}</p>
               </div>
            </div>
         </div>
         {
            replyComment && showComments && !!replyComment.length && replyComment.map(item => (<div className={`pl-9 `}>
               <PostItemCommentsItem key={item.id} {...item} replyHandler={replyHandler} />
            </div>))
         }
      </div >
   )
}

export default PostItemCommentsItem