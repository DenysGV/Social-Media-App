import PostItemUser from "./PostItemUser"

const SideBarRightItem = ({ type }: { type: string }) => {
   return (
      <div className="p-3 mt-3 rounded-lg bg-color-secondary-bg">
         <PostItemUser />
         <p className="text-xs text-color-primary-text pt-3 pb-2">Lorem ipsum dolor sit amet consectetur. Venenatis tempus ...</p>
         <div className="w-full mb-2">
            <img className="w-full rounded-lg" src="/post-img.png" alt="post img" />
         </div>
         {type == "repost" && <div className="flex">
            <div className="border-r border-solid border-color-primary-text opacity-30 ml-1"></div>
            <div className="py-0.5 ml-1">
               <div className="flex gap-2 items-center cursor-pointer w-fit mb-1.5 ml-0.5">
                  <div className="w-8 h-8 rounded-full">
                     <img className="w-full h-full" src="/user-logo.png" alt="user logo" />
                  </div>
                  <div>
                     <div className="flex gap-2">
                        <p className="text-xxs text-color-primary-text">Evgen Ledo</p>
                        <div className="flex items-center gap-1">
                           <div className="w-1 h-1 rounded-full bg-color-highlight"></div>
                           <p className="text-color-highlight text-xxs">1hr ago</p>
                        </div>
                     </div>
                  </div>
               </div>
               <p className="text-color-primary-text text-xxs ml-1.5">
                  Lorem ipsum dolor sit amet consectetur. Venenatis tempus
               </p>
               <div className="w-full p-1 mt-2">
                  <img src="/post-img.png" alt="post img" className="w-full rounded-2xl" />
               </div>
            </div>
         </div>}
         <div className="flex gap-3 pt-3 items-center">
            <div className="flex items-center gap-1">
               <svg className="cursor-pointer" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-color-primary-text" d="M11.5 7.93104C11.5 7.93104 11.5 7.66669 10.7717 6.70835C9.92833 5.59669 8.6825 4.79169 7.1875 4.79169C4.80125 4.79169 2.875 6.71794 2.875 9.10419C2.875 9.99544 3.14333 10.8196 3.60333 11.5C4.37958 12.6596 11.5 20.125 11.5 20.125M11.5 7.93104C11.5 7.93104 11.5 7.66669 12.2283 6.70835C13.0717 5.59669 14.3175 4.79169 15.8125 4.79169C18.1988 4.79169 20.125 6.71794 20.125 9.10419C20.125 9.99544 19.8567 10.8196 19.3967 11.5C18.6204 12.6596 11.5 20.125 11.5 20.125" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
               </svg>
               <p className="text-sm text-color-primary-text">14</p>
            </div>
            <div className="flex items-center gap-1">
               <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-color-primary-text" d="M6.70833 11.5H6.33075C5.95215 11.4999 5.582 11.612 5.267 11.822L2.875 13.4167V4.79167C2.875 4.28334 3.07693 3.79582 3.43638 3.43638C3.79582 3.07693 4.28334 2.875 4.79167 2.875H11.5C12.0083 2.875 12.4958 3.07693 12.8553 3.43638C13.2147 3.79582 13.4167 4.28334 13.4167 4.79167V6.70833M11.5 9.58333H18.2083C18.7167 9.58333 19.2042 9.78527 19.5636 10.1447C19.9231 10.5042 20.125 10.9917 20.125 11.5V20.125L17.733 18.5303C17.418 18.3203 17.0479 18.2082 16.6692 18.2083H11.5C10.9917 18.2083 10.5042 18.0064 10.1447 17.647C9.78527 17.2875 9.58333 16.8 9.58333 16.2917V11.5C9.58333 10.9917 9.78527 10.5042 10.1447 10.1447C10.5042 9.78527 10.9917 9.58333 11.5 9.58333Z" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
               </svg>
               <p className="text-sm text-color-primary-text">4</p>
            </div>
            <div className="button-mini">view details</div>
         </div>
      </div>
   )
}

export default SideBarRightItem