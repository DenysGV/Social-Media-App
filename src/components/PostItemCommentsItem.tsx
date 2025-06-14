const PostItemCommentsItem = () => {
   return (
      <div>
         <div className="p-3 bg-color-secondary-bg rounded-2xl">
            <div className="flex gap-2 items-center cursor-pointer w-fit">
               <div className="w-8 h-8 rounded-full">
                  <img className="w-full h-full" src="/user-logo.png" alt="user logo" />
               </div>
               <div>
                  <div className="flex gap-2">
                     <p className="text-sm text-color-primary-text">Evgen Ledo</p>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-color-highlight"></div>
                        <p className="text-color-highlight text-xxs">1hr ago</p>
                     </div>
                  </div>
               </div>
            </div>
            <p className="text-sm pt-2 pb-3 text-color-primary-text">Lorem ipsum dolor sit amet consectetur. Nunc sodales phasellus habitant sed vitae non. Rutrum massa viverra donec volutpat praesent nibh quam gravida feugiat. Nunc sapien neque sit facilisis ac ac.</p>
            <div className="flex justify-between">
               <p className="text-xs text-color-primary-text opacity-80 cursor-pointer">Reply</p>
               <div className="flex items-center gap-1">
                  <svg className="cursor-pointer" width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path className="stroke-color-primary-text" d="M11.5 7.93104C11.5 7.93104 11.5 7.66669 10.7717 6.70835C9.92833 5.59669 8.6825 4.79169 7.1875 4.79169C4.80125 4.79169 2.875 6.71794 2.875 9.10419C2.875 9.99544 3.14333 10.8196 3.60333 11.5C4.37958 12.6596 11.5 20.125 11.5 20.125M11.5 7.93104C11.5 7.93104 11.5 7.66669 12.2283 6.70835C13.0717 5.59669 14.3175 4.79169 15.8125 4.79169C18.1988 4.79169 20.125 6.71794 20.125 9.10419C20.125 9.99544 19.8567 10.8196 19.3967 11.5C18.6204 12.6596 11.5 20.125 11.5 20.125" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p className="text-xxs text-color-primary-text">14</p>
               </div>
            </div>
         </div>
         <div className="pl-9"></div>
      </div>
   )
}

export default PostItemCommentsItem