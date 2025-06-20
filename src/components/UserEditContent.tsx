import { useEffect, useState } from "react"
import SideBarLeftUserSkillsItem from "./SideBarLeftUserSkillsItem"
import Modal from "./Modal"
import UserEditForm from "./UserEditForm"
import type { IUser } from "../types/types"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEditUserDataMutation } from "../services/usersApi"
import { useNavigate, useParams } from "react-router-dom"
import { signIn } from "../store/slices/userSlice"

const UserEditContent = () => {
   const [fileInput, setFileInput] = useState<string | ArrayBuffer | null>(null)
   const user: IUser | null = useAppSelector((state) => state.user.user)
   const userId: string | undefined = useParams().id
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const [nameModal, setNameModal] = useState<boolean>(false)
   const [usernameModal, setUsernameModal] = useState<boolean>(false)
   const [aboutModal, setAboutModal] = useState<boolean>(false)
   const [skillsModal, setSkillsModal] = useState<boolean>(false)
   const [emailModal, setEmailModal] = useState<boolean>(false)
   const [passwordModal, setPasswordModal] = useState<boolean>(false)

   const [dangerousAlert, setDangerousAlert] = useState<string>('')
   const [editUser, { isLoading, isSuccess }] = useEditUserDataMutation()

   const modalsObj: { [key: string]: { modal: boolean, setModal: Function } } = {
      'name': {
         modal: nameModal,
         setModal: setNameModal,
      },
      'username': {
         modal: usernameModal,
         setModal: setUsernameModal,
      },
      'about': {
         modal: aboutModal,
         setModal: setAboutModal,
      },
      'skills': {
         modal: skillsModal,
         setModal: setSkillsModal,
      },
      'email': {
         modal: emailModal,
         setModal: setEmailModal,
      },
      'password': {
         modal: passwordModal,
         setModal: setPasswordModal,
      },
   }

   const openModalhandler = (type: string) => {
      modalsObj[type].setModal(true)
   }

   const setFilehandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         const file = e.target.files[0]

         setFileInput(await toBase64(file))
      }
   }

   const editUserDataHandler = async (data: string | string[], type: string) => {
      if (user) {
         const newUserData: IUser = { ...user }

         newUserData[type as keyof IUser] = data as any

         try {
            await editUser(newUserData).unwrap
            dispatch(signIn(newUserData))
         } catch (err) {
            setDangerousAlert('Editing was failed, try again')
         }
      }
   }

   const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>, data: string & string[], type: string) => {
      e.preventDefault()

      editUserDataHandler(data, type)
   }

   const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
   });

   useEffect(() => {
      if (!user || (user?.id != userId)) {
         navigate('/')
      }
   }, [])

   useEffect(() => {
      if (fileInput) {
         editUserDataHandler(`${fileInput}`, 'avatar')
      }
   }, [fileInput])

   return (
      <div className="w-2/4 pt-5">
         <div className="bg-color-primary-bg rounded-2xl px-3 py-6">
            <p className="text-base pb-2.5 text-color-primary-text">Edit profile</p>
            {isSuccess && <p className="alert_success">Profile edited successfully</p>}
            <div className="flex gap-3">
               <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-full">
                  {!fileInput && <img className="w-full h-full rounded-full overflow-hidden" src={user?.avatar ? `data:image/png;base64${user.avatar}` : '/user-logo.png'} alt="user logo" />}
                  {fileInput && <img className="w-full h-full rounded-full overflow-hidden" src={`${fileInput}`} alt="user logo" />}
                  <label className={`w-full h-full absolute -bottom-12 left-0 flex justify-center items-start cursor-pointer rounded-full`}>
                     <svg className="relative z-20 mt-2" width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 6.66667H12.5083M10.4167 17.5H5C4.33696 17.5 3.70107 17.2366 3.23223 16.7678C2.76339 16.2989 2.5 15.663 2.5 15V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V10.4167" stroke="#D5D5D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 13.3333L6.66667 9.16667C7.44 8.4225 8.39333 8.4225 9.16667 9.16667L12.5 12.5" stroke="#D5D5D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.6667 11.6667L12.5001 10.8333C13.0442 10.3092 13.6776 10.1542 14.2751 10.3675M15.8334 13.3333V18.3333M15.8334 18.3333L18.3334 15.8333M15.8334 18.3333L13.3334 15.8333" stroke="#D5D5D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                     <div className="w-full h-full opacity-80 bg-color-primary-bg absolute z-10">
                     </div>
                     <input type="file" onChange={(e) => { setFilehandler(e) }} className="hidden" />
                  </label>
               </div>
               <div className="py-2 w-full">
                  <div className="flex justify-between">
                     <div>
                        <div className="flex gap-2 items-center">
                           <p className="text-sm text-color-primary-text pt-1">{user?.name}</p>
                           <div onClick={() => { openModalhandler('name') }} className="cursor-pointer">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.416C21.5499 5.5602 21.5922 5.73278 21.5747 5.90458C21.5573 6.07639 21.481 6.23689 21.3589 6.359L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.1118 11.8884 8.16679 11.7818 8.24289 11.691L17.4699 2.47C17.6105 2.32955 17.8011 2.25066 17.9999 2.25066C18.1986 2.25066 18.3893 2.32955 18.5299 2.47L21.3589 5.298C21.3938 5.33483 21.4259 5.37428 21.4549 5.416ZM19.7679 5.828L17.9999 4.061L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.828Z" />
                                 <path className="fill-color-primary-text" d="M19.641 17.16C19.9143 14.824 20.0016 12.4699 19.902 10.12C19.8997 10.0646 19.9088 10.0094 19.929 9.95771C19.9491 9.90606 19.9798 9.85917 20.019 9.82L21.003 8.836C21.0299 8.80896 21.064 8.79026 21.1013 8.78215C21.1385 8.77403 21.1774 8.77685 21.2131 8.79026C21.2488 8.80368 21.2798 8.82711 21.3025 8.85776C21.3252 8.8884 21.3386 8.92494 21.341 8.963C21.5257 11.7542 21.4554 14.5565 21.131 17.335C20.895 19.357 19.271 20.942 17.258 21.167C13.7633 21.5538 10.2367 21.5538 6.74201 21.167C4.73001 20.942 3.10501 19.357 2.86901 17.335C2.45512 13.7904 2.45512 10.2096 2.86901 6.665C3.10501 4.643 4.72901 3.058 6.74201 2.833C9.39446 2.54005 12.0667 2.4688 14.731 2.62C14.7691 2.62274 14.8057 2.63635 14.8363 2.65921C14.867 2.68208 14.8904 2.71325 14.9039 2.74902C14.9173 2.7848 14.9203 2.82368 14.9123 2.86108C14.9044 2.89847 14.8859 2.9328 14.859 2.96L13.866 3.952C13.8272 3.99085 13.7808 4.02128 13.7297 4.04141C13.6786 4.06154 13.6239 4.07093 13.569 4.069C11.3458 3.99285 9.11993 4.07807 6.90901 4.324C6.26295 4.39551 5.65986 4.68272 5.19717 5.13925C4.73447 5.59578 4.43919 6.19496 4.35901 6.84C3.95787 10.2683 3.95787 13.7317 4.35901 17.16C4.43919 17.805 4.73447 18.4042 5.19717 18.8607C5.65986 19.3173 6.26295 19.6045 6.90901 19.676C10.264 20.051 13.736 20.051 17.092 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8607C19.2666 18.4042 19.5608 17.805 19.641 17.16Z" />
                              </svg>
                           </div>
                        </div>
                        <div className="flex gap-2 items-center">
                           <p className="text-xxs text-color-primary-text opacity-60">@{user?.username}</p>
                           <div onClick={() => { openModalhandler('username') }} className="cursor-pointer">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.416C21.5499 5.5602 21.5922 5.73278 21.5747 5.90458C21.5573 6.07639 21.481 6.23689 21.3589 6.359L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.1118 11.8884 8.16679 11.7818 8.24289 11.691L17.4699 2.47C17.6105 2.32955 17.8011 2.25066 17.9999 2.25066C18.1986 2.25066 18.3893 2.32955 18.5299 2.47L21.3589 5.298C21.3938 5.33483 21.4259 5.37428 21.4549 5.416ZM19.7679 5.828L17.9999 4.061L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.828Z" />
                                 <path className="fill-color-primary-text" d="M19.641 17.16C19.9143 14.824 20.0016 12.4699 19.902 10.12C19.8997 10.0646 19.9088 10.0094 19.929 9.95771C19.9491 9.90606 19.9798 9.85917 20.019 9.82L21.003 8.836C21.0299 8.80896 21.064 8.79026 21.1013 8.78215C21.1385 8.77403 21.1774 8.77685 21.2131 8.79026C21.2488 8.80368 21.2798 8.82711 21.3025 8.85776C21.3252 8.8884 21.3386 8.92494 21.341 8.963C21.5257 11.7542 21.4554 14.5565 21.131 17.335C20.895 19.357 19.271 20.942 17.258 21.167C13.7633 21.5538 10.2367 21.5538 6.74201 21.167C4.73001 20.942 3.10501 19.357 2.86901 17.335C2.45512 13.7904 2.45512 10.2096 2.86901 6.665C3.10501 4.643 4.72901 3.058 6.74201 2.833C9.39446 2.54005 12.0667 2.4688 14.731 2.62C14.7691 2.62274 14.8057 2.63635 14.8363 2.65921C14.867 2.68208 14.8904 2.71325 14.9039 2.74902C14.9173 2.7848 14.9203 2.82368 14.9123 2.86108C14.9044 2.89847 14.8859 2.9328 14.859 2.96L13.866 3.952C13.8272 3.99085 13.7808 4.02128 13.7297 4.04141C13.6786 4.06154 13.6239 4.07093 13.569 4.069C11.3458 3.99285 9.11993 4.07807 6.90901 4.324C6.26295 4.39551 5.65986 4.68272 5.19717 5.13925C4.73447 5.59578 4.43919 6.19496 4.35901 6.84C3.95787 10.2683 3.95787 13.7317 4.35901 17.16C4.43919 17.805 4.73447 18.4042 5.19717 18.8607C5.65986 19.3173 6.26295 19.6045 6.90901 19.676C10.264 20.051 13.736 20.051 17.092 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8607C19.2666 18.4042 19.5608 17.805 19.641 17.16Z" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-5">
               <div className="flex items-center gap-2">
                  <p className="text-sm text-color-primary-text">About</p>
                  <div onClick={() => { openModalhandler('about') }} className="cursor-pointer">
                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.416C21.5499 5.5602 21.5922 5.73278 21.5747 5.90458C21.5573 6.07639 21.481 6.23689 21.3589 6.359L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.1118 11.8884 8.16679 11.7818 8.24289 11.691L17.4699 2.47C17.6105 2.32955 17.8011 2.25066 17.9999 2.25066C18.1986 2.25066 18.3893 2.32955 18.5299 2.47L21.3589 5.298C21.3938 5.33483 21.4259 5.37428 21.4549 5.416ZM19.7679 5.828L17.9999 4.061L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.828Z" />
                        <path className="fill-color-primary-text" d="M19.641 17.16C19.9143 14.824 20.0016 12.4699 19.902 10.12C19.8997 10.0646 19.9088 10.0094 19.929 9.95771C19.9491 9.90606 19.9798 9.85917 20.019 9.82L21.003 8.836C21.0299 8.80896 21.064 8.79026 21.1013 8.78215C21.1385 8.77403 21.1774 8.77685 21.2131 8.79026C21.2488 8.80368 21.2798 8.82711 21.3025 8.85776C21.3252 8.8884 21.3386 8.92494 21.341 8.963C21.5257 11.7542 21.4554 14.5565 21.131 17.335C20.895 19.357 19.271 20.942 17.258 21.167C13.7633 21.5538 10.2367 21.5538 6.74201 21.167C4.73001 20.942 3.10501 19.357 2.86901 17.335C2.45512 13.7904 2.45512 10.2096 2.86901 6.665C3.10501 4.643 4.72901 3.058 6.74201 2.833C9.39446 2.54005 12.0667 2.4688 14.731 2.62C14.7691 2.62274 14.8057 2.63635 14.8363 2.65921C14.867 2.68208 14.8904 2.71325 14.9039 2.74902C14.9173 2.7848 14.9203 2.82368 14.9123 2.86108C14.9044 2.89847 14.8859 2.9328 14.859 2.96L13.866 3.952C13.8272 3.99085 13.7808 4.02128 13.7297 4.04141C13.6786 4.06154 13.6239 4.07093 13.569 4.069C11.3458 3.99285 9.11993 4.07807 6.90901 4.324C6.26295 4.39551 5.65986 4.68272 5.19717 5.13925C4.73447 5.59578 4.43919 6.19496 4.35901 6.84C3.95787 10.2683 3.95787 13.7317 4.35901 17.16C4.43919 17.805 4.73447 18.4042 5.19717 18.8607C5.65986 19.3173 6.26295 19.6045 6.90901 19.676C10.264 20.051 13.736 20.051 17.092 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8607C19.2666 18.4042 19.5608 17.805 19.641 17.16Z" />
                     </svg>
                  </div>
               </div>
               <p className="text-xs text-color-primary-text pt-2 opacity-80">
                  {user?.about ? user?.about : 'You have no description yet, add it !'}
               </p>
            </div>
            <div className="pt-5">
               <div className="flex gap-2 items-center">
                  <p className="text-sm text-color-primary-text">Skills</p>
                  <div onClick={() => { openModalhandler('skills') }} className="cursor-pointer">
                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.416C21.5499 5.5602 21.5922 5.73278 21.5747 5.90458C21.5573 6.07639 21.481 6.23689 21.3589 6.359L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.1118 11.8884 8.16679 11.7818 8.24289 11.691L17.4699 2.47C17.6105 2.32955 17.8011 2.25066 17.9999 2.25066C18.1986 2.25066 18.3893 2.32955 18.5299 2.47L21.3589 5.298C21.3938 5.33483 21.4259 5.37428 21.4549 5.416ZM19.7679 5.828L17.9999 4.061L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.828Z" />
                        <path className="fill-color-primary-text" d="M19.641 17.16C19.9143 14.824 20.0016 12.4699 19.902 10.12C19.8997 10.0646 19.9088 10.0094 19.929 9.95771C19.9491 9.90606 19.9798 9.85917 20.019 9.82L21.003 8.836C21.0299 8.80896 21.064 8.79026 21.1013 8.78215C21.1385 8.77403 21.1774 8.77685 21.2131 8.79026C21.2488 8.80368 21.2798 8.82711 21.3025 8.85776C21.3252 8.8884 21.3386 8.92494 21.341 8.963C21.5257 11.7542 21.4554 14.5565 21.131 17.335C20.895 19.357 19.271 20.942 17.258 21.167C13.7633 21.5538 10.2367 21.5538 6.74201 21.167C4.73001 20.942 3.10501 19.357 2.86901 17.335C2.45512 13.7904 2.45512 10.2096 2.86901 6.665C3.10501 4.643 4.72901 3.058 6.74201 2.833C9.39446 2.54005 12.0667 2.4688 14.731 2.62C14.7691 2.62274 14.8057 2.63635 14.8363 2.65921C14.867 2.68208 14.8904 2.71325 14.9039 2.74902C14.9173 2.7848 14.9203 2.82368 14.9123 2.86108C14.9044 2.89847 14.8859 2.9328 14.859 2.96L13.866 3.952C13.8272 3.99085 13.7808 4.02128 13.7297 4.04141C13.6786 4.06154 13.6239 4.07093 13.569 4.069C11.3458 3.99285 9.11993 4.07807 6.90901 4.324C6.26295 4.39551 5.65986 4.68272 5.19717 5.13925C4.73447 5.59578 4.43919 6.19496 4.35901 6.84C3.95787 10.2683 3.95787 13.7317 4.35901 17.16C4.43919 17.805 4.73447 18.4042 5.19717 18.8607C5.65986 19.3173 6.26295 19.6045 6.90901 19.676C10.264 20.051 13.736 20.051 17.092 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8607C19.2666 18.4042 19.5608 17.805 19.641 17.16Z" />
                     </svg>
                  </div>
               </div>
               <div className="flex flex-wrap gap-2.5 mt-2">
                  {user?.skills.map((item, index) => (
                     <SideBarLeftUserSkillsItem key={index} skillName={item} type="fixed" />
                  ))}
                  {!user?.skills.length && <p className="text-sm text-color-primary-text opacity-80">Have no skills yet</p>}
               </div>
            </div>
            <div className="mt-5">
               <p className="text-sm text-color-primary-text pb-2">Personal information & Security</p>
               <div className="flex items-center gap-2 opacity-80">
                  <p className="text-xs text-color-primary-text">
                     {user?.email}
                  </p>
                  <div onClick={() => { openModalhandler('email') }} className="cursor-pointer">
                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.416C21.5499 5.5602 21.5922 5.73278 21.5747 5.90458C21.5573 6.07639 21.481 6.23689 21.3589 6.359L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.1118 11.8884 8.16679 11.7818 8.24289 11.691L17.4699 2.47C17.6105 2.32955 17.8011 2.25066 17.9999 2.25066C18.1986 2.25066 18.3893 2.32955 18.5299 2.47L21.3589 5.298C21.3938 5.33483 21.4259 5.37428 21.4549 5.416ZM19.7679 5.828L17.9999 4.061L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.828Z" />
                        <path className="fill-color-primary-text" d="M19.641 17.16C19.9143 14.824 20.0016 12.4699 19.902 10.12C19.8997 10.0646 19.9088 10.0094 19.929 9.95771C19.9491 9.90606 19.9798 9.85917 20.019 9.82L21.003 8.836C21.0299 8.80896 21.064 8.79026 21.1013 8.78215C21.1385 8.77403 21.1774 8.77685 21.2131 8.79026C21.2488 8.80368 21.2798 8.82711 21.3025 8.85776C21.3252 8.8884 21.3386 8.92494 21.341 8.963C21.5257 11.7542 21.4554 14.5565 21.131 17.335C20.895 19.357 19.271 20.942 17.258 21.167C13.7633 21.5538 10.2367 21.5538 6.74201 21.167C4.73001 20.942 3.10501 19.357 2.86901 17.335C2.45512 13.7904 2.45512 10.2096 2.86901 6.665C3.10501 4.643 4.72901 3.058 6.74201 2.833C9.39446 2.54005 12.0667 2.4688 14.731 2.62C14.7691 2.62274 14.8057 2.63635 14.8363 2.65921C14.867 2.68208 14.8904 2.71325 14.9039 2.74902C14.9173 2.7848 14.9203 2.82368 14.9123 2.86108C14.9044 2.89847 14.8859 2.9328 14.859 2.96L13.866 3.952C13.8272 3.99085 13.7808 4.02128 13.7297 4.04141C13.6786 4.06154 13.6239 4.07093 13.569 4.069C11.3458 3.99285 9.11993 4.07807 6.90901 4.324C6.26295 4.39551 5.65986 4.68272 5.19717 5.13925C4.73447 5.59578 4.43919 6.19496 4.35901 6.84C3.95787 10.2683 3.95787 13.7317 4.35901 17.16C4.43919 17.805 4.73447 18.4042 5.19717 18.8607C5.65986 19.3173 6.26295 19.6045 6.90901 19.676C10.264 20.051 13.736 20.051 17.092 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8607C19.2666 18.4042 19.5608 17.805 19.641 17.16Z" />
                     </svg>
                  </div>
               </div>
               <div className="flex items-center gap-2 pt-1 opacity-80">
                  <p className="text-xs text-color-primary-text">
                     password
                  </p>
                  <div onClick={() => { openModalhandler('password') }} className="cursor-pointer">
                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-color-primary-text" fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.416C21.5499 5.5602 21.5922 5.73278 21.5747 5.90458C21.5573 6.07639 21.481 6.23689 21.3589 6.359L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.1118 11.8884 8.16679 11.7818 8.24289 11.691L17.4699 2.47C17.6105 2.32955 17.8011 2.25066 17.9999 2.25066C18.1986 2.25066 18.3893 2.32955 18.5299 2.47L21.3589 5.298C21.3938 5.33483 21.4259 5.37428 21.4549 5.416ZM19.7679 5.828L17.9999 4.061L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.828Z" />
                        <path className="fill-color-primary-text" d="M19.641 17.16C19.9143 14.824 20.0016 12.4699 19.902 10.12C19.8997 10.0646 19.9088 10.0094 19.929 9.95771C19.9491 9.90606 19.9798 9.85917 20.019 9.82L21.003 8.836C21.0299 8.80896 21.064 8.79026 21.1013 8.78215C21.1385 8.77403 21.1774 8.77685 21.2131 8.79026C21.2488 8.80368 21.2798 8.82711 21.3025 8.85776C21.3252 8.8884 21.3386 8.92494 21.341 8.963C21.5257 11.7542 21.4554 14.5565 21.131 17.335C20.895 19.357 19.271 20.942 17.258 21.167C13.7633 21.5538 10.2367 21.5538 6.74201 21.167C4.73001 20.942 3.10501 19.357 2.86901 17.335C2.45512 13.7904 2.45512 10.2096 2.86901 6.665C3.10501 4.643 4.72901 3.058 6.74201 2.833C9.39446 2.54005 12.0667 2.4688 14.731 2.62C14.7691 2.62274 14.8057 2.63635 14.8363 2.65921C14.867 2.68208 14.8904 2.71325 14.9039 2.74902C14.9173 2.7848 14.9203 2.82368 14.9123 2.86108C14.9044 2.89847 14.8859 2.9328 14.859 2.96L13.866 3.952C13.8272 3.99085 13.7808 4.02128 13.7297 4.04141C13.6786 4.06154 13.6239 4.07093 13.569 4.069C11.3458 3.99285 9.11993 4.07807 6.90901 4.324C6.26295 4.39551 5.65986 4.68272 5.19717 5.13925C4.73447 5.59578 4.43919 6.19496 4.35901 6.84C3.95787 10.2683 3.95787 13.7317 4.35901 17.16C4.43919 17.805 4.73447 18.4042 5.19717 18.8607C5.65986 19.3173 6.26295 19.6045 6.90901 19.676C10.264 20.051 13.736 20.051 17.092 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8607C19.2666 18.4042 19.5608 17.805 19.641 17.16Z" />
                     </svg>
                  </div>
               </div>
            </div>
         </div>

         {Object.keys(modalsObj).map(item => (
            <>
               {dangerousAlert && <p className="alert_dangerous">{dangerousAlert}</p>}
               <Modal key={item} setOpen={modalsObj[item].setModal} open={modalsObj[item].modal}>
                  <>
                     <UserEditForm type={item} onSubmitHandler={onSubmitHandler} initialValue={user ? user[item as keyof IUser] ?? "" : ''} />
                  </>
               </Modal>
            </>
         ))}

      </div>
   )
}

export default UserEditContent