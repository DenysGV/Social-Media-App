import SideBarRightItem from "./SideBarRightItem"

const SideBarRight = () => {
   return (
      <div className="bg-color-primary-bg rounded-2xl p-3 w-1/4 mt-5">
         <p className="text-sm text-color-primary-text">Most Popular</p>
         <SideBarRightItem type="post" />
         <SideBarRightItem type="repost" />
      </div>
   )
}

export default SideBarRight