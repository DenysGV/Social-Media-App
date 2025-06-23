import { useState } from "react"
import PostBuilder from "./PostBuilder"
import PostItemActions from "./PostItemActions"
import PostItemComments from "./PostItemComments"
import PostItemUser from "./PostItemUser"
import type { IComment, IPost, IUser } from "../types/types"
import { useGetUserByIdQuery } from "../services/usersApi"
import { useGetPostByIdQuery } from "../services/postsApi"
import { useGetCommentsQuery } from "../services/commentsApi"
import { useAppSelector } from "../store/hooks"
import ModalReport from "./ModalReport"
import ModalDelete from "./ModalDelete"
import { useNavigate } from "react-router-dom"

interface IPostItemProps extends IPost {
   isSidebarItem?: boolean
}

const PostItem = ({ userId, id, repostPostId, content, createTimestamp, isSidebarItem }: IPostItemProps) => {
   const [ownerModal, setOwnerModal] = useState<boolean>(false)
   const [userModal, setUserModal] = useState<boolean>(false)
   const [repost, setRepost] = useState<string>('')
   const [reply, setReply] = useState<{
      username: string,
      commentId: string
   } | null>(null)
   let repostData: IPost | null = null
   const navigate = useNavigate()

   const { data } = useGetUserByIdQuery(userId)
   const userPost: IUser | undefined = data

   const user: IUser | null = useAppSelector((state) => state.user.user)

   const [showComments, setShowComments] = useState<boolean>(false)

   const { data: dataComments } = useGetCommentsQuery(id)
   let comments: IComment[] = []
   if (dataComments) {
      comments = dataComments?.filter(item => item.postId == id)
   }

   const repostHandler = (resetRepost?: boolean) => {
      if (resetRepost) {
         setRepost('')
         return
      }

      if (userPost) {
         setRepost(userPost.username)
      }
   }

   if (repostPostId && !repost) {
      const { data } = useGetPostByIdQuery(repostPostId)
      if (data) {
         repostData = data
      }
   }

   const replyHandler = (replyUsername: string, replyCommentId: string, resetRepost?: boolean) => {
      if (resetRepost) {
         setReply(null)
         return
      }

      if (replyUsername) {
         setReply({
            username: replyUsername,
            commentId: replyCommentId
         })
      }
   }

   const openModalHandler = () => {
      if (user?.id == userPost?.id) {
         setOwnerModal(true)
      } else {
         setUserModal(true)
      }
   }

   return (
      <div className="mb-5">
         <div onClick={() => { isSidebarItem && navigate(`/post/${id}`) }} className={`p-3 bg-color-primary-bg rounded-2xl ${isSidebarItem && 'bg-color-secondary-bg cursor-pointer'}`}>
            <div className="flex justify-between">
               <PostItemUser userId={userId} createTimestamp={createTimestamp} />
               <div className="flex gap-1 mt-1 mr-1 cursor-pointer" onClick={() => { openModalHandler() }}>
                  <div className="w-1 h-1 bg-color-primary-text rounded-full"></div>
                  <div className="w-1 h-1 bg-color-primary-text rounded-full"></div>
                  <div className="w-1 h-1 bg-color-primary-text rounded-full"></div>
               </div>
            </div>
            {content.text && <p className="text-xs text-color-primary-text pt-3 pl-1">{content.text}</p>}
            {content.img && <div className="w-full mb-2 pt-3">
               <img src={`data:image/png;base64${content.img}`} alt="post img" className="w-full rounded-2xl" />
            </div>}
            {repostData && <div className="flex gap-5">
               <div className="border-r border-solid border-color-secondary-bg ml-2"></div>
               <div className="py-2 cursor-pointer">
                  <div className="w-fit">
                     <PostItemUser userId={repostData.userId} createTimestamp={repostData.createTimestamp} />
                  </div>
                  {repostData.content.text && <p className="text-xs text-color-primary-text pt-3 pl-1">{repostData.content.text}</p>}
                  {repostData.content.img && <div className="w-full pt-3">
                     <img src={`${repostData.content.img}`} alt="post img" className="w-full rounded-2xl" />
                  </div>}
               </div>
            </div>}
            <PostItemActions isSidebarItem={isSidebarItem} repostHandler={repostHandler} setShowComments={setShowComments} showRepostButton={!repostPostId} postId={id} commentsLength={comments?.length} />
            {showComments && <PostItemComments replyHandler={replyHandler} comments={comments} />}
            {!isSidebarItem && user && <>
               <hr className="border-color-secondary-bg" />

               <div className="mt-3">
                  <PostBuilder type={'comment'} username={reply?.username} replyId={reply?.commentId} replyHandler={replyHandler} postId={id} />
               </div>
            </>}
         </div>

         {repost && <div className="mt-3 p-3 bg-color-primary-bg rounded-2xl">
            <PostBuilder type={'repost'} repostHandler={repostHandler} username={userPost?.username} postId={id} />
         </div>}

         <ModalReport postId={id} isOpen={userModal} setIsOpen={setUserModal} />
         <ModalDelete postId={id} isOpen={ownerModal} setIsOpen={setOwnerModal} />
      </div>
   )
}

export default PostItem