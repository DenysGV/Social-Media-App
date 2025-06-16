import { useState } from "react"
import SideBarLeftSignIn from "./SideBarLeftSignIn"
import SideBarLeftSignUp from "./SideBarLeftSignUp"
import SideBarLeftUser from "./SideBarLeftUser"
import type { IUser } from "../types/types"

const SideBarLeft = () => {
   const [visibleForm, setVisibleForm] = useState<string>('sign in')
   const [authorized, setAuthorized] = useState<boolean>(false)

   const storageUser = localStorage.getItem('user')
   const userAuthorized: IUser | null = storageUser ? JSON.parse(storageUser) : null

   return (
      <div className="w-1/4 pt-5">
         {authorized && userAuthorized && <SideBarLeftUser setAuthorized={setAuthorized} />}

         {!userAuthorized && <div>
            {visibleForm == 'sign in' && <SideBarLeftSignIn setAuthorized={setAuthorized} setVisibleForm={setVisibleForm} />}
            {visibleForm == 'sign up' && <SideBarLeftSignUp setAuthorized={setAuthorized} setVisibleForm={setVisibleForm} />}
         </div>}
      </div>
   )
}

export default SideBarLeft