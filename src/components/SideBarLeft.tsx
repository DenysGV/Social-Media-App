import { useState } from "react"
import SideBarLeftSignIn from "./SideBarLeftSignIn"
import SideBarLeftSignUp from "./SideBarLeftSignUp"
import SideBarLeftUser from "./SideBarLeftUser"
import type { IUser } from "../types/types"
import { useAppSelector } from "../store/hooks"

const SideBarLeft = () => {
   const [visibleForm, setVisibleForm] = useState<string>('sign in')

   const user: IUser | null = useAppSelector((state) => state.user.user)

   return (
      <div className="w-1/4 pt-5">
         {user && <SideBarLeftUser />}

         {!user && <div>
            {visibleForm == 'sign in' && <SideBarLeftSignIn setVisibleForm={setVisibleForm} />}
            {visibleForm == 'sign up' && <SideBarLeftSignUp setVisibleForm={setVisibleForm} />}
         </div>}
      </div>
   )
}

export default SideBarLeft