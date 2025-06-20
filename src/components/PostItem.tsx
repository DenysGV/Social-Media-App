import { useState } from "react"
import Modal from "./Modal"
import PostBuilder from "./PostBuilder"
import PostItemActions from "./PostItemActions"
import PostItemComments from "./PostItemComments"
import PostItemUser from "./PostItemUser"
import type { IComment, IPost, IUser } from "../types/types"
import { useGetUserByIdQuery } from "../services/usersApi"
import { useGetPostByIdQuery } from "../services/postsApi"
import { useGetCommentsQuery } from "../services/commentsApi"

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

   const { data } = useGetUserByIdQuery(userId)
   const user: IUser | undefined = data

   const [showComments, setShowComments] = useState<boolean>(false)

   const { data: dataComments } = useGetCommentsQuery(id)
   let comments: IComment[] = []
   if (dataComments) {
      comments = dataComments
   }

   const repostHandler = (resetRepost?: boolean) => {
      if (resetRepost) {
         setRepost('')
         return
      }

      if (user) {
         setRepost(user.username)
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

   return (
      <div className="mb-5">
         <div className={`p-3 bg-color-primary-bg rounded-2xl ${isSidebarItem && 'bg-color-secondary-bg'}`}>
            <div className="flex justify-between">
               <PostItemUser userId={userId} createTimestamp={createTimestamp} />
               <div className="flex gap-1 mt-1 mr-1 cursor-pointer">
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
            {!isSidebarItem && <>
               <hr className="border-color-secondary-bg" />

               <div className="mt-3">
                  <PostBuilder type={'comment'} username={reply?.username} replyId={reply?.commentId} replyHandler={replyHandler} postId={id} />
               </div>
            </>}
         </div>

         {repost && <div className="mt-3 p-3 bg-color-primary-bg rounded-2xl">
            <PostBuilder type={'repost'} repostHandler={repostHandler} username={user?.username} postId={id} />
         </div>}

         <Modal open={userModal} setOpen={setUserModal}>
            <form onSubmit={(e) => { }}>
               <p className="text-sm text-color-primary-text pb-2">Actions</p>
               <div className="flex gap-2">
                  <div className="py-2 px-3 w-full rounded-2xl bg-color-secondary-bg">
                     <p className="text-color-primary-text text-sm opacity-80">https://social-media.com/posts/1145</p>
                  </div>
                  <div className="p-2 flex justify-center items-center rounded-2xl cursor-pointer bg-color-secondary-bg">
                     <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-color-primary-text" d="M4.5 8.25C4.5 6.129 4.5 5.06775 5.15925 4.40925C5.81775 3.75 6.879 3.75 9 3.75H11.25C13.371 3.75 14.4323 3.75 15.0908 4.40925C15.75 5.06775 15.75 6.129 15.75 8.25V12C15.75 14.121 15.75 15.1823 15.0908 15.8408C14.4323 16.5 13.371 16.5 11.25 16.5H9C6.879 16.5 5.81775 16.5 5.15925 15.8408C4.5 15.1823 4.5 14.121 4.5 12V8.25Z" />
                        <path className="stroke-color-primary-text" d="M4.5 14.25C3.90326 14.25 3.33097 14.0129 2.90901 13.591C2.48705 13.169 2.25 12.5967 2.25 12V7.5C2.25 4.67175 2.25 3.25725 3.129 2.379C4.008 1.50075 5.42175 1.5 8.25 1.5H11.25C11.8467 1.5 12.419 1.73705 12.841 2.15901C13.2629 2.58097 13.5 3.15326 13.5 3.75" />
                     </svg>
                  </div>
               </div>
               <div className="py-2 my-2 w-full flex gap-2 px-3 items-center border-b border-solid border-color-highlight rounded-2xl cursor-pointer bg-color-secondary-bg">
                  <div>
                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_9_532)">
                           <path className="fill-color-primary-text" d="M0 2.07812C0 0.931 0.931 0 2.07812 0H16.9219C18.069 0 19 0.931 19 2.07812V13.3594C19 13.9105 18.7811 14.4391 18.3913 14.8288C18.0016 15.2186 17.473 15.4375 16.9219 15.4375H9.57125L6.51581 18.4929C6.27362 18.7342 5.96543 18.8984 5.63008 18.9648C5.29473 19.0312 4.94723 18.9968 4.63138 18.866C4.31554 18.7352 4.04549 18.5138 3.85527 18.2297C3.66506 17.9457 3.56318 17.6117 3.5625 17.2698V15.4375H2.07812C1.52697 15.4375 0.998393 15.2186 0.608669 14.8288C0.218945 14.4391 0 13.9105 0 13.3594L0 2.07812ZM2.07812 1.78125C1.99939 1.78125 1.92388 1.81253 1.8682 1.8682C1.81253 1.92388 1.78125 1.99939 1.78125 2.07812V13.3594C1.78125 13.5232 1.91425 13.6562 2.07812 13.6562H4.45312C4.68933 13.6562 4.91587 13.7501 5.08289 13.9171C5.24992 14.0841 5.34375 14.3107 5.34375 14.5469V17.1475L8.57375 13.9175C8.74061 13.7504 8.967 13.6565 9.20312 13.6562H16.9219C17.0006 13.6562 17.0761 13.625 17.1318 13.5693C17.1875 13.5136 17.2188 13.4381 17.2188 13.3594V2.07812C17.2188 1.99939 17.1875 1.92388 17.1318 1.8682C17.0761 1.81253 17.0006 1.78125 16.9219 1.78125H2.07812ZM10.3906 4.45312V7.42188C10.3906 7.65808 10.2968 7.88462 10.1298 8.05164C9.96274 8.21867 9.73621 8.3125 9.5 8.3125C9.26379 8.3125 9.03726 8.21867 8.87023 8.05164C8.70321 7.88462 8.60938 7.65808 8.60938 7.42188V4.45312C8.60938 4.21692 8.70321 3.99038 8.87023 3.82336C9.03726 3.65633 9.26379 3.5625 9.5 3.5625C9.73621 3.5625 9.96274 3.65633 10.1298 3.82336C10.2968 3.99038 10.3906 4.21692 10.3906 4.45312ZM10.6875 10.6875C10.6875 11.0024 10.5624 11.3045 10.3397 11.5272C10.117 11.7499 9.81494 11.875 9.5 11.875C9.18506 11.875 8.88301 11.7499 8.66031 11.5272C8.43761 11.3045 8.3125 11.0024 8.3125 10.6875C8.3125 10.3726 8.43761 10.0705 8.66031 9.84781C8.88301 9.62511 9.18506 9.5 9.5 9.5C9.81494 9.5 10.117 9.62511 10.3397 9.84781C10.5624 10.0705 10.6875 10.3726 10.6875 10.6875Z" fillOpacity="0.8" />
                        </g>
                        <defs>
                           <clipPath id="clip0_9_532">
                              <rect className="fill-color-primary-text" width="19" height="19" fill="white" />
                           </clipPath>
                        </defs>
                     </svg>
                  </div>
                  <p className="text-sm text-color-primary-text">Report</p>
               </div>
               <input className="w-full mb-2" type="text" placeholder="report message" value={''} onChange={() => { }} />
               <button className="button" type="submit">Report post</button>
            </form>
         </Modal>

         <Modal open={ownerModal} setOpen={setOwnerModal}>
            <form onSubmit={(e) => { }}>
               <p className="text-sm text-color-primary-text pb-2">Actions</p>
               <div className="flex gap-2">
                  <div className="py-2 px-3 w-full rounded-2xl bg-color-secondary-bg">
                     <p className="text-color-primary-text text-sm opacity-80">https://social-media.com/posts/1145</p>
                  </div>
                  <div className="p-2 flex justify-center items-center rounded-2xl cursor-pointer bg-color-secondary-bg">
                     <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-color-primary-text" d="M4.5 8.25C4.5 6.129 4.5 5.06775 5.15925 4.40925C5.81775 3.75 6.879 3.75 9 3.75H11.25C13.371 3.75 14.4323 3.75 15.0908 4.40925C15.75 5.06775 15.75 6.129 15.75 8.25V12C15.75 14.121 15.75 15.1823 15.0908 15.8408C14.4323 16.5 13.371 16.5 11.25 16.5H9C6.879 16.5 5.81775 16.5 5.15925 15.8408C4.5 15.1823 4.5 14.121 4.5 12V8.25Z" />
                        <path className="stroke-color-primary-text" d="M4.5 14.25C3.90326 14.25 3.33097 14.0129 2.90901 13.591C2.48705 13.169 2.25 12.5967 2.25 12V7.5C2.25 4.67175 2.25 3.25725 3.129 2.379C4.008 1.50075 5.42175 1.5 8.25 1.5H11.25C11.8467 1.5 12.419 1.73705 12.841 2.15901C13.2629 2.58097 13.5 3.15326 13.5 3.75" />
                     </svg>
                  </div>
               </div>
               <div className="py-2 px-3 my-2 w-full flex gap-2 items-center rounded-2xl cursor-pointer bg-color-secondary-bg">
                  <div>
                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_9_755)">
                           <path d="M0.791992 3.95832H18.2087M7.71908 14.0521V8.11457M11.2816 14.0521V8.11457M11.2816 0.791656H7.71908C7.40413 0.791656 7.10209 0.916768 6.87939 1.13947C6.65669 1.36217 6.53158 1.66421 6.53158 1.97916V3.95832H12.4691V1.97916C12.4691 1.66421 12.344 1.36217 12.1213 1.13947C11.8986 0.916768 11.5965 0.791656 11.2816 0.791656ZM14.9312 17.1158C14.9091 17.4133 14.7752 17.6915 14.5563 17.8942C14.3375 18.0969 14.0499 18.2091 13.7516 18.2083H5.24908C4.95075 18.2091 4.6632 18.0969 4.44432 17.8942C4.22545 17.6915 4.09152 17.4133 4.06949 17.1158L2.96908 3.95832H16.0316L14.9312 17.1158Z" stroke="#FF0000" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                           <clipPath id="clip0_9_755">
                              <rect width="19" height="19" fill="white" />
                           </clipPath>
                        </defs>
                     </svg>
                  </div>
                  <p className="text-sm text-red-500">Remove post</p>
               </div>
            </form>
         </Modal>
      </div>
   )
}

export default PostItem