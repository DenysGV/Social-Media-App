import { Link, useParams } from "react-router-dom"
import PostItem from "./PostItem"
import SideBarLeftUserSkills from "./SideBarLeftUserSkills"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../services/apiUrl"
import type { IPost, IUser } from "../types/types"
import { useAppSelector } from "../store/hooks"

const UserContent = () => {
   const user: IUser | null = useAppSelector((state) => state.user.user)
   const userId: string | undefined = useParams().id
   const [userData, setUserData] = useState<IUser | null>(null)
   const [userPosts, setUserPosts] = useState<IPost[] | null>(null)
   const [dangerousAlert, setDangerousAlert] = useState<string>('')

   const getUserData = async () => {
      try {
         const resUserData = await axios.get(`${API_URL}users/${userId}`)

         if (resUserData.data) {
            setUserData(resUserData.data)
         }

         const resUserPosts = await axios.get(`${API_URL}posts?userId=${userId}`)

         if (resUserPosts.data) {
            setUserPosts(resUserPosts.data)
         }
      } catch (err) {
         setDangerousAlert('Cant fetch user data')
      }
   }

   useEffect(() => {
      if (userId) {
         getUserData()
      }
   }, [])

   if (dangerousAlert) {
      return <div className="w-2/4 pt-5">
         <p className="alert_dangerous">{dangerousAlert}</p>
      </div>
   }

   return (
      <div className="w-2/4 pt-5">
         <div className="bg-color-primary-bg p-3 rounded-2xl">
            <div className="flex gap-3">
               <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden">
                  <img className="w-full h-full" src={userData?.avatar ? `data:image/png;base64${userData.avatar}` : '/user-logo.png'} alt="user logo" />
               </div>
               <div className="py-2 w-full">
                  <div className="flex justify-between">
                     <div>
                        <p className="text-sm text-color-primary-text pt-1">{userData?.name}</p>
                        <p className="text-xxs text-color-primary-text opacity-60">@{userData?.username}</p>
                     </div>
                     {user?.id == userData?.id && <Link to={`/user/edit/${user?.id}`} className="cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.416C21.5499 5.5602 21.5922 5.73278 21.5747 5.90458C21.5573 6.07639 21.481 6.23689 21.3589 6.359L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.1118 11.8884 8.16679 11.7818 8.24289 11.691L17.4699 2.47C17.6105 2.32955 17.8011 2.25066 17.9999 2.25066C18.1986 2.25066 18.3893 2.32955 18.5299 2.47L21.3589 5.298C21.3938 5.33483 21.4259 5.37428 21.4549 5.416ZM19.7679 5.828L17.9999 4.061L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.828Z" />
                           <path className="fill-color-primary-text" d="M19.641 17.16C19.9143 14.824 20.0016 12.4699 19.902 10.12C19.8997 10.0646 19.9088 10.0094 19.929 9.95771C19.9491 9.90606 19.9798 9.85917 20.019 9.82L21.003 8.836C21.0299 8.80896 21.064 8.79026 21.1013 8.78215C21.1385 8.77403 21.1774 8.77685 21.2131 8.79026C21.2488 8.80368 21.2798 8.82711 21.3025 8.85776C21.3252 8.8884 21.3386 8.92494 21.341 8.963C21.5257 11.7542 21.4554 14.5565 21.131 17.335C20.895 19.357 19.271 20.942 17.258 21.167C13.7633 21.5538 10.2367 21.5538 6.74201 21.167C4.73001 20.942 3.10501 19.357 2.86901 17.335C2.45512 13.7904 2.45512 10.2096 2.86901 6.665C3.10501 4.643 4.72901 3.058 6.74201 2.833C9.39446 2.54005 12.0667 2.4688 14.731 2.62C14.7691 2.62274 14.8057 2.63635 14.8363 2.65921C14.867 2.68208 14.8904 2.71325 14.9039 2.74902C14.9173 2.7848 14.9203 2.82368 14.9123 2.86108C14.9044 2.89847 14.8859 2.9328 14.859 2.96L13.866 3.952C13.8272 3.99085 13.7808 4.02128 13.7297 4.04141C13.6786 4.06154 13.6239 4.07093 13.569 4.069C11.3458 3.99285 9.11993 4.07807 6.90901 4.324C6.26295 4.39551 5.65986 4.68272 5.19717 5.13925C4.73447 5.59578 4.43919 6.19496 4.35901 6.84C3.95787 10.2683 3.95787 13.7317 4.35901 17.16C4.43919 17.805 4.73447 18.4042 5.19717 18.8607C5.65986 19.3173 6.26295 19.6045 6.90901 19.676C10.264 20.051 13.736 20.051 17.092 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8607C19.2666 18.4042 19.5608 17.805 19.641 17.16Z" />
                        </svg>
                     </Link>}
                  </div>
                  <p className="text-xs text-color-primary-text pt-4">
                     {userData?.about}
                  </p>
               </div>
            </div>
            <SideBarLeftUserSkills skills={userData?.skills} />
         </div>
         <div className="mt-5">
            {userPosts?.map(item => <PostItem key={item.id} {...item} />)}
         </div>
      </div>
   )
}

export default UserContent