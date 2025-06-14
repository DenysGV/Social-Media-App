import HomeContent from "./HomeContent"
import SideBarLeft from "./SideBarLeft"
import SideBarRight from "./SideBarRight"

const HomeContainer = () => {
   return (
      <div className="flex gap-7 container">
         <SideBarLeft />
         <HomeContent />
         <SideBarRight />
      </div>
   )
}

export default HomeContainer