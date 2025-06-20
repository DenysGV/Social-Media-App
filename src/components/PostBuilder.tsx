import { useState } from "react"
import { useCreatePostMutation } from "../services/postsApi"
import type { IComment, IPost, IUser } from "../types/types"
import { useAppSelector } from "../store/hooks"
import { useCreateCommentMutation } from "../services/commentsApi"

const PostBuilder = ({ type, postId, replyId, repostHandler, username, replyHandler }: { type: string, postId?: string, replyId?: string, repostHandler?: Function, username?: string, replyHandler?: Function }) => {
   const [text, setText] = useState<string>('')
   const [fileInput, setFileInput] = useState<string | ArrayBuffer | null>(null)

   const user: IUser | null = useAppSelector((state) => state.user.user)

   const [dangerousAlert, setDangerousAlert] = useState<string>('')

   const [createPost, { isLoading, isSuccess, error }] = useCreatePostMutation()
   const [createComment, { isLoading: isLoadingComment, isSuccess: isSuccessComment, error: errorComment }] = useCreateCommentMutation()

   const setFilehandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         const file = e.target.files[0]

         setFileInput(await toBase64(file))
      }
   }

   const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
   });

   const resetPhotohandler = () => {
      setFileInput(null)
   }

   const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      setDangerousAlert('')

      if (type == "comment") {
         createCommentHandler()
         return
      }

      createPostHandler()
   }

   const createCommentHandler = async () => {
      if (!text && !fileInput) {
         setDangerousAlert('Fill in the comment field')
         return
      }

      if (postId && user) {
         const newComment: IComment = {
            id: `${new Date().getTime()}`,
            postId,
            userId: user.id,
            text: text,
            createTimestamp: new Date().getTime(),
         }

         if (replyId) {
            newComment.replyId = replyId
         }

         try {
            await createComment(newComment).unwrap()

            setText('')
         } catch (err) {
            setDangerousAlert(`Error creating comment: ${(errorComment as any)?.data.message | (errorComment as any)?.error}`)
         }
      } else {
         setDangerousAlert(`Sign in to your account`)
      }
   }

   const createPostHandler = async () => {
      if (!text && !fileInput) {
         setDangerousAlert('Fill in the field or attach a file')
         return
      }

      if (user) {
         const newPost: IPost = {
            id: `new Date().getTime()`,
            userId: user?.id,
            createTimestamp: new Date().getTime(),
            content: {}
         }

         if (text) {
            newPost.content.text = text
         }

         if (fileInput) {
            newPost.content.img = fileInput
         }

         if (username && postId) {
            newPost.repostPostId = postId
         }

         try {
            await createPost(newPost).unwrap()

            resetPhotohandler()
            setText('')
         } catch (err) {
            setDangerousAlert(`Error creating post: ${(error as any)?.data?.message | (error as any)?.error}`)
         }
      } else {
         setDangerousAlert(`Sign in to your account`)
      }
   }

   const cancelResponseHandler = () => {
      if (type == "comment" && replyHandler) {
         replyHandler(true)
      }

      if (type == "repost" && repostHandler) {
         repostHandler(true)
      }
   }

   if (!user) {
      return
   }

   return (
      <>
         {dangerousAlert && <p className="alert_dangerous">{dangerousAlert}</p>}
         {isSuccess && <p className="alert_success">Post created successfully</p>}
         {isSuccessComment && <p className="alert_success">Comment created successfully</p>}
         <form className="flex gap-3 items-end" onSubmit={submitFormHandler}>
            <div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden">
               <img className="w-full h-full" src={user.avatar ? `data:image/png;base64${user.avatar}` : '/user-logo.png'} alt="user logo" />
            </div>
            <div className="w-full">
               {username && (type == "comment" || type == "repost") && <div onClick={() => { cancelResponseHandler() }} className="flex gap-2 items-center px-2 py-1 mb-2 bg-color-secondary-bg w-fit rounded-2xl cursor-pointer">
                  <p className="text-xxs text-color-primary-text opacity-70">{type == "comment" ? "Reply" : "Repost"}: @{username}</p>
                  <div className="opacity-70">
                     <svg width="6" height="6" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-color-primary-text" d="M1 1L10 10M1 10L10 1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>
               </div>}
               <input type="text" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }} placeholder={type == "comment" ? 'Comment...' : "Post theme"} className="w-full" />
            </div>
            {type != "comment" && <label className="w-9 h-9 rounded-full bg-color-secondary-bg flex-shrink-0 flex items-center justify-center cursor-pointer">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-color-primary-text" d="M12.5 6.66667H12.5083M10.4167 17.5H5C4.33696 17.5 3.70107 17.2366 3.23223 16.7678C2.76339 16.2989 2.5 15.663 2.5 15V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V10.4167" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path className="stroke-color-primary-text" d="M2.5 13.3333L6.66667 9.16667C7.44 8.4225 8.39333 8.4225 9.16667 9.16667L12.5 12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path className="stroke-color-primary-text" d="M11.6667 11.6667L12.5001 10.8333C13.0442 10.3092 13.6776 10.1542 14.2751 10.3675M15.8334 13.3333V18.3333M15.8334 18.3333L18.3334 15.8333M15.8334 18.3333L13.3334 15.8333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
               <input type="file" onChange={(e) => { setFilehandler(e) }} className="hidden" />
            </label>}
            <button type="submit" disabled={type == 'comment' ? isLoadingComment : isLoading} className="w-9 h-9 rounded-full bg-color-secondary-bg flex-shrink-0 flex items-center justify-center cursor-pointer">
               <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-color-primary-text" d="M17.5349 2.03263C18.4239 1.722 19.2779 2.576 18.9673 3.465L13.7829 18.2787C13.446 19.2395 12.1073 19.2937 11.6943 18.3636L9.19265 12.7356L12.7137 9.21375C12.8296 9.08935 12.8927 8.92481 12.8897 8.75479C12.8867 8.58478 12.8178 8.42257 12.6976 8.30233C12.5773 8.18209 12.4151 8.11322 12.2451 8.11022C12.0751 8.10722 11.9106 8.17033 11.7862 8.28625L8.26428 11.8073L2.63628 9.30563C1.70615 8.89175 1.76128 7.55387 2.72115 7.217L17.5349 2.03263Z" />
               </svg>
            </button>
         </form >
         {fileInput && <div className="flex justify-center w-3/4 py-3 relative mx-auto">
            <img className="w-full rounded-2xl" src={`data:image/png;base64${fileInput}`} alt="uploaded photo" />
            <div onClick={resetPhotohandler} className="flex absolute top-5 right-2 justify-center items-center flex-shrink-0 w-5 h-5 rounded-full bg-color-secondary-bg cursor-pointer">
               <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-color-primary-text" d="M1 1L10 10M1 10L10 1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
         </div>
         }
      </>
   )
}

export default PostBuilder