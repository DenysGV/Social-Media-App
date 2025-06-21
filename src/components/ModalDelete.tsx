import { useState } from "react"
import { useDeletePostMutation } from "../services/postsApi"
import Modal from "./Modal"
import PostItemPath from "./PostItemPath"

const ModalDelete = ({ postId, isOpen, setIsOpen }: { postId: string, isOpen: boolean, setIsOpen: Function }) => {
   const [dangerousAlert, setDangerousAlert] = useState<string>('')
   const [deletePost] = useDeletePostMutation()

   const removePostHandler = () => {
      try {
         deletePost(postId).unwrap
      } catch (err) {
         setDangerousAlert('Deleting post was failed, please try again')
      }
   }

   return (
      <Modal open={isOpen} setOpen={setIsOpen}>
         <div>
            <p className="text-sm text-color-primary-text pb-2">Actions</p>
            {dangerousAlert && <p className="alert_dangerous">{dangerousAlert}</p>}
            <PostItemPath postId={postId} />
            <div onClick={() => { removePostHandler() }} className="py-2 px-3 my-2 w-full flex gap-2 items-center rounded-2xl cursor-pointer bg-color-secondary-bg">
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
         </div>
      </Modal>
   )
}

export default ModalDelete