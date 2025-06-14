import SideBarLeft from "./SideBarLeft"
import SideBarRight from "./SideBarRight"
import UserEditContent from "./UserEditContent"

const UserEditContainer = () => {
   return (
      <div className="flex gap-7 container">
         <SideBarLeft />
         <UserEditContent />
         <SideBarRight />
      </div>
   )
}

export default UserEditContainer