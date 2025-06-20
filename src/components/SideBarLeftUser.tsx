import { useAppDispatch } from "../store/hooks"
import { logOut } from "../store/slices/userSlice"
import type { IUser } from "../types/types"
import SideBarLeftUserSkills from "./SideBarLeftUserSkills"

const SideBarLeftUser = () => {
   const storageUser = localStorage.getItem('user')
   const userAuthorized: IUser | null = storageUser ? JSON.parse(storageUser) : null
   const dispatch = useAppDispatch()

   const leaveHandler = () => {
      dispatch(logOut())
   }

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
            <div className="flex flex-col items-center mt-5 mb-4">
               <p className="text-sm text-color-primary-text pt-1">{userAuthorized?.name}</p>
               <p className="text-xxs text-color-primary-text opacity-60">@{userAuthorized?.username}</p>
            </div>
            {userAuthorized?.about && <p className="pb-5 text-xs px-3 text-center text-color-primary-text">{userAuthorized?.about}</p>}
            <div className="px-1 pb-1 flex gap-2">
               <div className="button">My Profile</div>
               <div onClick={leaveHandler} className="p-2 flex-shrink-0 text-sm text-color-primary-text rounded-2xl cursor-pointer bg-color-secondary-bg">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M19.1837 8.89499C19.3111 8.78895 19.4753 8.73781 19.6403 8.75281C19.8053 8.76781 19.9576 8.84773 20.0637 8.97499L22.6675 12.1C22.7689 12.2278 22.8163 12.3902 22.7996 12.5525C22.7829 12.7148 22.7033 12.8642 22.578 12.9686C22.4527 13.0731 22.2914 13.1244 22.1288 13.1115C21.9661 13.0987 21.8149 13.0228 21.7075 12.9L19.1037 9.77499C18.9977 9.64767 18.9466 9.48345 18.9616 9.31843C18.9766 9.15341 19.0565 9.00111 19.1837 8.89499Z" />
                     <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M19.1837 16.105C19.0565 15.9989 18.9766 15.8466 18.9616 15.6815C18.9466 15.5165 18.9977 15.3523 19.1037 15.225L21.7075 12.1C21.7593 12.0347 21.8236 11.9804 21.8967 11.9404C21.9698 11.9003 22.0501 11.8753 22.133 11.8668C22.2159 11.8582 22.2997 11.8663 22.3794 11.8907C22.4591 11.915 22.5332 11.955 22.5972 12.0083C22.6612 12.0617 22.7139 12.1273 22.7522 12.2013C22.7905 12.2753 22.8136 12.3563 22.8202 12.4394C22.8267 12.5224 22.8166 12.606 22.7903 12.6851C22.7641 12.7642 22.7224 12.8373 22.6675 12.9L20.0637 16.025C19.9576 16.1522 19.8053 16.2322 19.6403 16.2472C19.4753 16.2622 19.3111 16.211 19.1837 16.105Z" />
                     <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.875 12.5C21.875 12.6658 21.8092 12.8247 21.6919 12.9419C21.5747 13.0592 21.4158 13.125 21.25 13.125H11.875C11.7092 13.125 11.5503 13.0592 11.4331 12.9419C11.3158 12.8247 11.25 12.6658 11.25 12.5C11.25 12.3342 11.3158 12.1753 11.4331 12.0581C11.5503 11.9408 11.7092 11.875 11.875 11.875H21.25C21.4158 11.875 21.5747 11.9408 21.6919 12.0581C21.8092 12.1753 21.875 12.3342 21.875 12.5ZM4.375 3.75C4.375 3.58424 4.44085 3.42527 4.55806 3.30806C4.67527 3.19085 4.83424 3.125 5 3.125H16.25C16.4158 3.125 16.5747 3.19085 16.6919 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75C16.875 3.91576 16.8092 4.07473 16.6919 4.19194C16.5747 4.30915 16.4158 4.375 16.25 4.375H5C4.83424 4.375 4.67527 4.30915 4.55806 4.19194C4.44085 4.07473 4.375 3.91576 4.375 3.75ZM4.375 21.25C4.375 21.0842 4.44085 20.9253 4.55806 20.8081C4.67527 20.6908 4.83424 20.625 5 20.625H16.25C16.4158 20.625 16.5747 20.6908 16.6919 20.8081C16.8092 20.9253 16.875 21.0842 16.875 21.25C16.875 21.4158 16.8092 21.5747 16.6919 21.6919C16.5747 21.8092 16.4158 21.875 16.25 21.875H5C4.83424 21.875 4.67527 21.8092 4.55806 21.6919C4.44085 21.5747 4.375 21.4158 4.375 21.25Z" />
                     <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M16.25 3.125C16.4158 3.125 16.5747 3.19085 16.6919 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75V8.75C16.875 8.91576 16.8092 9.07473 16.6919 9.19194C16.5747 9.30915 16.4158 9.375 16.25 9.375C16.0842 9.375 15.9253 9.30915 15.8081 9.19194C15.6908 9.07473 15.625 8.91576 15.625 8.75V3.75C15.625 3.58424 15.6908 3.42527 15.8081 3.30806C15.9253 3.19085 16.0842 3.125 16.25 3.125ZM16.25 15.625C16.4158 15.625 16.5747 15.6908 16.6919 15.8081C16.8092 15.9253 16.875 16.0842 16.875 16.25V21.25C16.875 21.4158 16.8092 21.5747 16.6919 21.6919C16.5747 21.8092 16.4158 21.875 16.25 21.875C16.0842 21.875 15.9253 21.8092 15.8081 21.6919C15.6908 21.5747 15.625 21.4158 15.625 21.25V16.25C15.625 16.0842 15.6908 15.9253 15.8081 15.8081C15.9253 15.6908 16.0842 15.625 16.25 15.625ZM5 3.125C5.16576 3.125 5.32473 3.19085 5.44194 3.30806C5.55915 3.42527 5.625 3.58424 5.625 3.75V21.25C5.625 21.4158 5.55915 21.5747 5.44194 21.6919C5.32473 21.8092 5.16576 21.875 5 21.875C4.83424 21.875 4.67527 21.8092 4.55806 21.6919C4.44085 21.5747 4.375 21.4158 4.375 21.25V3.75C4.375 3.58424 4.44085 3.42527 4.55806 3.30806C4.67527 3.19085 4.83424 3.125 5 3.125Z" />
                  </svg>
               </div>
            </div>
         </div>
         <SideBarLeftUserSkills />
      </div>
   )
}

export default SideBarLeftUser