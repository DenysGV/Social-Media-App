import PostBuilder from "./PostBuilder"
import PostItemActions from "./PostItemActions"
import PostItemComments from "./PostItemComments"
import PostItemUser from "./PostItemUser"

const PostItem = ({ type }: { type: string }) => {
   return (
      <>
         <div className="mt-5 p-3 bg-color-primary-bg rounded-2xl">
            <div className="flex justify-between">
               <PostItemUser />
               <div className="flex gap-1 mt-1 mr-1 cursor-pointer">
                  <div className="w-1 h-1 bg-color-primary-text rounded-full"></div>
                  <div className="w-1 h-1 bg-color-primary-text rounded-full"></div>
                  <div className="w-1 h-1 bg-color-primary-text rounded-full"></div>
               </div>
            </div>
            <p className="text-xs text-color-primary-text py-3 pl-1">Hello, i`m UX/UI designer. Open to the new projects</p>
            <div className="w-full mb-2">
               <img src="/post-img.png" alt="post img" className="w-full rounded-2xl" />
            </div>
            {type == "repost" && <div className="flex gap-5">
               <div className="border-r border-solid border-color-secondary-bg ml-2"></div>
               <div className="py-2 cursor-pointer">
                  <div className="w-fit">
                     <PostItemUser />
                  </div>
                  <p className="text-xs text-color-primary-text py-3 pl-1">Hello, i`m UX/UI designer. Open to the new projects</p>
                  <div className="w-full">
                     <img src="/post-img.png" alt="post img" className="w-full rounded-2xl" />
                  </div>
               </div>
            </div>}
            <PostItemActions />
            <PostItemComments />
            <hr className="border-color-secondary-bg" />

            <div className="mt-3">
               <PostBuilder type={'comment'} />
            </div>
         </div>
         <div className="mt-3 p-3 bg-color-primary-bg rounded-2xl">
            <PostBuilder type={'repost'} />
         </div>
      </>
   )
}

export default PostItem