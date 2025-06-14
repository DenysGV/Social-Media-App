const PostItemUser = () => {
   return (
      <div className="flex gap-2 items-center cursor-pointer">
         <div className="w-11 h-11 rounded-full">
            <img className="w-full h-full" src="/user-logo.png" alt="user logo" />
         </div>
         <div>
            <p className="text-xxs text-color-primary-text opacity-60">@evgenledo</p>
            <div className="flex gap-2 pt-1">
               <p className="text-sm text-color-primary-text">Evgen Ledo</p>
               <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-color-highlight"></div>
                  <p className="text-color-highlight text-xxs">1hr ago</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PostItemUser