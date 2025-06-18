import { useState } from "react"
import SideBarLeftUserSkillsItem from "./SideBarLeftUserSkillsItem"

const UserEditForm = ({ type, onSubmithandler }: { type: string, onSubmithandler: Function }) => {
   const [text, setText] = useState<string>('')
   const password = type == "password" ? useState<boolean>(false) : null
   const [skills, setSkills] = useState<string[]>([])

   const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
   }

   const onKeyDownhandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type != 'skills') {
         return
      }

      if (e.key === 'Enter') {
         setSkills([...skills, text])
         setText('')
      }
   }

   return (
      <form onSubmit={(e) => { onSubmithandler(e, text) }}>
         <p className="text-sm text-color-primary-text pb-2">Edit {type}</p>
         {!!skills.length && <div className="flex flex-wrap gap-2 pt-1 pb-2">
            {skills.map((item, index) => (<SideBarLeftUserSkillsItem key={index} skillName={item} type="editable" id={++index} setSkills={setSkills} />))}
         </div>}
         {password ?
            <div className="relative mb-2">
               <input className="w-full" type={password?.[0] ? `text` : 'password'} placeholder="password" />
               <div className="absolute top-2 right-2.5 cursor-pointer">
                  {password?.[0] ?
                     <svg onClick={() => { password[1](false) }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12.375C7.14375 12.375 5.625 10.8562 5.625 9C5.625 7.14375 7.14375 5.625 9 5.625C10.8562 5.625 12.375 7.14375 12.375 9C12.375 10.8562 10.8562 12.375 9 12.375ZM9 6.75C7.7625 6.75 6.75 7.7625 6.75 9C6.75 10.2375 7.7625 11.25 9 11.25C10.2375 11.25 11.25 10.2375 11.25 9C11.25 7.7625 10.2375 6.75 9 6.75Z" fill="#D5D5D5" />
                        <path d="M9.00002 14.625C5.41127 14.625 2.26127 12.4425 1.15877 9.18C1.11358 9.06425 1.11358 8.93575 1.15877 8.82C2.26127 5.56875 5.42252 3.375 9.00002 3.375C12.5775 3.375 15.7388 5.5575 16.8413 8.82C16.8863 8.9325 16.8863 9.0675 16.8413 9.18C15.7388 12.4312 12.5775 14.625 9.00002 14.625ZM2.28377 9C3.28502 11.7 5.96252 13.5 9.00002 13.5C12.0375 13.5 14.7038 11.7 15.7163 9C14.715 6.3 12.0375 4.5 9.00002 4.5C5.96252 4.5 3.29627 6.3 2.28377 9Z" fill="#D5D5D5" />
                        <path d="M15.75 16.3125C15.6762 16.3134 15.6031 16.2988 15.5353 16.2698C15.4675 16.2407 15.4065 16.1978 15.3562 16.1437L1.85625 2.64374C1.63125 2.41874 1.63125 2.06999 1.85625 1.84499C2.08125 1.61999 2.43 1.61999 2.655 1.84499L16.1438 15.3562C16.3688 15.5812 16.3688 15.93 16.1438 16.155C16.0313 16.2675 15.885 16.3237 15.75 16.3237V16.3125Z" fill="#D5D5D5" />
                     </svg> :
                     <svg onClick={() => { password?.[1](true) }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12.375C7.14375 12.375 5.625 10.8562 5.625 9C5.625 7.14375 7.14375 5.625 9 5.625C10.8562 5.625 12.375 7.14375 12.375 9C12.375 10.8562 10.8562 12.375 9 12.375ZM9 6.75C7.7625 6.75 6.75 7.7625 6.75 9C6.75 10.2375 7.7625 11.25 9 11.25C10.2375 11.25 11.25 10.2375 11.25 9C11.25 7.7625 10.2375 6.75 9 6.75Z" fill="#D5D5D5" />
                        <path d="M9.00002 14.625C5.41127 14.625 2.26127 12.4425 1.15877 9.18C1.11358 9.06425 1.11358 8.93575 1.15877 8.82C2.26127 5.56875 5.42252 3.375 9.00002 3.375C12.5775 3.375 15.7388 5.5575 16.8413 8.82C16.8863 8.9325 16.8863 9.0675 16.8413 9.18C15.7388 12.4312 12.5775 14.625 9.00002 14.625ZM2.28377 9C3.28502 11.7 5.96252 13.5 9.00002 13.5C12.0375 13.5 14.7038 11.7 15.7163 9C14.715 6.3 12.0375 4.5 9.00002 4.5C5.96252 4.5 3.29627 6.3 2.28377 9Z" fill="#D5D5D5" />
                     </svg>
                  }
               </div>
            </div> :
            <input className="w-full mb-2" type="text" placeholder={type == 'skills' ? 'skills (enter to add)' : type} value={text} onChange={onChangehandler} onKeyDown={onKeyDownhandler} />}

         <button className="button" type="submit">Edit</button>
      </form>
   )
}

export default UserEditForm