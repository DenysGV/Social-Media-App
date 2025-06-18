import axios from "axios"
import { useCreateLikeMutation, useDeleteLikeMutation } from "../services/likesApi"
import { useAppSelector } from "../store/hooks"
import type { ILike, IUser } from "../types/types"
import { API_URL } from "../services/apiUrl"
import { useEffect, useState } from "react"

const PostItemActions = ({ repostHandler, setShowComments, showRepostButton, commentsLength, postId }: { repostHandler: Function, setShowComments?: Function, showRepostButton: boolean, commentsLength: number, postId: string }) => {
   const [createLike] = useCreateLikeMutation()
   const [deleteLike] = useDeleteLikeMutation()
   const [isLiked, setIsLiked] = useState<ILike | null>(null)
   const [likesQtw, setLikesQtw] = useState<number>(0)
   const user: IUser | null = useAppSelector((state) => state.user.user)

   const likeHandler = async () => {
      if (user) {
         if (isLiked) {
            await deleteLike(isLiked.id)
            setIsLiked(null)
         } else {
            const newLike: ILike = {
               id: `${new Date().getTime()}`,
               postId: postId,
               userId: user.id
            }

            await createLike(newLike)
            setIsLiked(newLike)
         }
      }
   }

   const isLikedHandler = async () => {
      if (user) {
         const res = await axios.get(`${API_URL}likes?postId=${postId}&userId=${user.id}`)
         const resFiltred = res.data.filter((item: ILike) => !item.commentId)

         if (resFiltred.length) {
            setIsLiked(resFiltred[0])
            return
         }
      }

      setIsLiked(null)
   }

   const getLikesQtw = async () => {
      const res = await axios.get(`${API_URL}likes?postId=${postId}`)
      const resFiltred = res.data.filter((item: ILike) => !item.commentId)

      if (resFiltred) {
         setLikesQtw(resFiltred.length)
      }
   }

   useEffect(() => {
      isLikedHandler()
   }, [user])

   useEffect(() => {
      getLikesQtw()
   }, [isLiked])

   return (
      <div className="flex gap-3 py-3">
         <div className="flex items-center gap-1">
            {!isLiked && <svg onClick={() => { likeHandler() }} className="cursor-pointer" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path className="stroke-color-primary-text" d="M11.5 7.93104C11.5 7.93104 11.5 7.66669 10.7717 6.70835C9.92833 5.59669 8.6825 4.79169 7.1875 4.79169C4.80125 4.79169 2.875 6.71794 2.875 9.10419C2.875 9.99544 3.14333 10.8196 3.60333 11.5C4.37958 12.6596 11.5 20.125 11.5 20.125M11.5 7.93104C11.5 7.93104 11.5 7.66669 12.2283 6.70835C13.0717 5.59669 14.3175 4.79169 15.8125 4.79169C18.1988 4.79169 20.125 6.71794 20.125 9.10419C20.125 9.99544 19.8567 10.8196 19.3967 11.5C18.6204 12.6596 11.5 20.125 11.5 20.125" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>}
            {isLiked && <svg onClick={() => { likeHandler() }} className="cursor-pointer" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M11.5 7.93098C11.5 7.93098 11.5 7.66663 10.7717 6.70829C9.92833 5.59663 8.6825 4.79163 7.1875 4.79163C4.80125 4.79163 2.875 6.71788 2.875 9.10413C2.875 9.99538 3.14333 10.8195 3.60333 11.5C4.37958 12.6595 11.5 20.125 11.5 20.125M11.5 7.93098C11.5 7.93098 11.5 7.66663 12.2283 6.70829C13.0717 5.59663 14.3175 4.79163 15.8125 4.79163C18.1988 4.79163 20.125 6.71788 20.125 9.10413C20.125 9.99538 19.8567 10.8195 19.3967 11.5C18.6204 12.6595 11.5 20.125 11.5 20.125" fill="#FF0000" />
               <path d="M11.5 7.93098C11.5 7.93098 11.5 7.66663 10.7717 6.70829C9.92833 5.59663 8.6825 4.79163 7.1875 4.79163C4.80125 4.79163 2.875 6.71788 2.875 9.10413C2.875 9.99538 3.14333 10.8195 3.60333 11.5C4.37958 12.6595 11.5 20.125 11.5 20.125C11.5 20.125 18.6204 12.6595 19.3967 11.5C19.8567 10.8195 20.125 9.99538 20.125 9.10413C20.125 6.71788 18.1988 4.79163 15.8125 4.79163C14.3175 4.79163 13.0717 5.59663 12.2283 6.70829C11.5 7.66663 11.5 7.93098 11.5 7.93098Z" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>}
            <p className="text-sm text-color-primary-text">{likesQtw}</p>
         </div>
         {setShowComments && <div className="flex items-center gap-1">
            <svg onClick={() => { setShowComments(true) }} className="cursor-pointer" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path className="stroke-color-primary-text" d="M6.70833 11.5H6.33075C5.95215 11.4999 5.582 11.612 5.267 11.822L2.875 13.4167V4.79167C2.875 4.28334 3.07693 3.79582 3.43638 3.43638C3.79582 3.07693 4.28334 2.875 4.79167 2.875H11.5C12.0083 2.875 12.4958 3.07693 12.8553 3.43638C13.2147 3.79582 13.4167 4.28334 13.4167 4.79167V6.70833M11.5 9.58333H18.2083C18.7167 9.58333 19.2042 9.78527 19.5636 10.1447C19.9231 10.5042 20.125 10.9917 20.125 11.5V20.125L17.733 18.5303C17.418 18.3203 17.0479 18.2082 16.6692 18.2083H11.5C10.9917 18.2083 10.5042 18.0064 10.1447 17.647C9.78527 17.2875 9.58333 16.8 9.58333 16.2917V11.5C9.58333 10.9917 9.78527 10.5042 10.1447 10.1447C10.5042 9.78527 10.9917 9.58333 11.5 9.58333Z" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p className="text-sm text-color-primary-text">{commentsLength}</p>
         </div>}
         {showRepostButton && <div onClick={() => { repostHandler() }}>
            <svg className="cursor-pointer" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M15.9179 20.125C15.2829 20.125 14.744 19.903 14.3012 19.459C13.8591 19.0143 13.638 18.4744 13.638 17.8394C13.638 17.7435 13.6802 17.5017 13.7645 17.1139L6.86742 13.019C6.66042 13.2579 6.4071 13.4454 6.10746 13.5815C5.80782 13.7176 5.48614 13.7856 5.14242 13.7856C4.51247 13.7856 3.97708 13.5614 3.53625 13.1129C3.09542 12.6644 2.875 12.1267 2.875 11.5C2.875 10.8733 3.09542 10.3356 3.53625 9.88713C3.97708 9.43863 4.51247 9.21437 5.14242 9.21437C5.4855 9.21437 5.80718 9.28242 6.10746 9.4185C6.40774 9.55458 6.66106 9.74242 6.86742 9.982L13.7655 5.90429C13.7208 5.78035 13.6885 5.65736 13.6687 5.53533C13.6483 5.41267 13.638 5.28744 13.638 5.15967C13.638 4.52525 13.8607 3.98571 14.306 3.54104C14.7513 3.09701 15.2918 2.875 15.9275 2.875C16.5632 2.875 17.1024 3.09765 17.5452 3.54296C17.9879 3.98826 18.209 4.52876 18.2083 5.16446C18.2077 5.80015 17.9857 6.33938 17.5423 6.78212C17.0989 7.22487 16.559 7.44593 15.9227 7.44529C15.5764 7.44529 15.257 7.37437 14.9644 7.23254C14.6718 7.09071 14.4226 6.9 14.2169 6.66042L7.31783 10.7554C7.36256 10.8793 7.39482 11.0026 7.41462 11.1253C7.43507 11.2473 7.44529 11.3722 7.44529 11.5C7.44529 11.6278 7.43507 11.7527 7.41462 11.8747C7.39418 11.9967 7.36224 12.12 7.31879 12.2446L14.2169 16.3396C14.4232 16.1 14.6724 15.9093 14.9644 15.7675C15.257 15.6256 15.5764 15.5547 15.9227 15.5547C16.5578 15.5547 17.0976 15.777 17.5423 16.2217C17.9863 16.6677 18.2083 17.2085 18.2083 17.8442C18.2083 18.4799 17.9857 19.0191 17.5404 19.4618C17.0951 19.9046 16.5536 20.1256 15.9179 20.125ZM15.9227 19.1667C16.299 19.1667 16.6143 19.0395 16.8686 18.7852C17.1229 18.531 17.25 18.216 17.25 17.8403C17.25 17.4647 17.1229 17.1494 16.8686 16.8945C16.6143 16.6395 16.2993 16.5124 15.9237 16.513C15.548 16.5137 15.2327 16.6408 14.9778 16.8945C14.7229 17.1481 14.5957 17.4631 14.5964 17.8394C14.597 18.2157 14.7242 18.531 14.9778 18.7852C15.2314 19.0395 15.5458 19.1667 15.9227 19.1667ZM5.14242 12.8263C5.52319 12.8263 5.84264 12.6992 6.10075 12.4449C6.35822 12.1906 6.48696 11.8757 6.48696 11.5C6.48696 11.1243 6.35822 10.8094 6.10075 10.5551C5.84328 10.3008 5.52383 10.1737 5.14242 10.1737C4.77122 10.1737 4.4604 10.3008 4.20996 10.5551C3.95951 10.8094 3.83397 11.1243 3.83333 11.5C3.83269 11.8757 3.95824 12.191 4.20996 12.4459C4.46168 12.7008 4.7725 12.8276 5.14242 12.8263ZM15.9237 6.48696C16.2993 6.48696 16.6143 6.35982 16.8686 6.10554C17.1229 5.85126 17.25 5.53597 17.25 5.15967C17.25 4.78336 17.1229 4.46839 16.8686 4.21475C16.6143 3.96111 16.2993 3.83397 15.9237 3.83333C15.548 3.83269 15.2327 3.95983 14.9778 4.21475C14.7229 4.46967 14.5957 4.78496 14.5964 5.16063C14.597 5.53629 14.7242 5.85126 14.9778 6.10554C15.2314 6.35982 15.5467 6.48696 15.9237 6.48696Z" fill="white" />
            </svg>
         </div>}
      </div>
   )
}

export default PostItemActions