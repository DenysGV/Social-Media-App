import SideBarLeftUserSkills from "./SideBarLeftUserSkills"

const SideBarLeftUser = () => {
   return (
      <div>
         <div className="h-16 rounded-tl-2xl rounded-tr-2xl bg-color-primary-bg"></div>
         <div className="p-1 rounded-b-2xl rounded-bl-2xl bg-color-secondary-bg">
            <div className="flex justify-center items-end gap-3 -mt-10">
               <div>
                  <p className="text-sm text-color-primary-text text-center">1984</p>
                  <p className="text-xs text-color-primary-text opacity-80">Followers</p>
               </div>
               <div className="w-20 h-20">
                  <img className="w-full h-full" src="/user-logo.png" alt="user logo" />
               </div>
               <div>
                  <p className="text-sm text-color-primary-text text-center">1984</p>
                  <p className="text-xs text-color-primary-text opacity-80">Following</p>
               </div>
            </div>
            <div className="flex flex-col items-center mt-5">
               <p className="text-sm text-color-primary-text pt-1">Evgen Ledo</p>
               <p className="text-xxs text-color-primary-text opacity-60">@evgenledo</p>
            </div>
            <p className="pt-4 pb-5 text-xs px-3 text-center text-color-primary-text">Hello, i`m UX/UI designer. Open to the new projects</p>
            <div className="px-1 pb-1">
               <div className="button">My Profile</div>
            </div>
         </div>
         <SideBarLeftUserSkills />
      </div>
   )
}

export default SideBarLeftUser