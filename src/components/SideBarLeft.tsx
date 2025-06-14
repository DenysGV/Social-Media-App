import SideBarLeftSignIn from "./SideBarLeftSignIn"
import SideBarLeftSignUp from "./SideBarLeftSignUp"
import SideBarLeftUser from "./SideBarLeftUser"

const SideBarLeft = () => {
   return (
      <div className="w-1/4 pt-5">
         <SideBarLeftUser />
         {/* <SideBarLeftSignIn /> */}
         {/* <SideBarLeftSignUp /> */}
      </div>
   )
}

export default SideBarLeft