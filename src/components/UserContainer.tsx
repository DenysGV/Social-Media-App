import SideBarLeft from "./SideBarLeft"
import SideBarRight from "./SideBarRight"
import UserContent from "./UserContent"

const UserContainer = () => {
   return (
      <div className="flex gap-7 container">
         <SideBarLeft />
         <UserContent />
         <SideBarRight />
      </div>
   )
}

export default UserContainer