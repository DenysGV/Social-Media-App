import PostPageContent from "./PostPageContent"
import SideBarLeft from "./SideBarLeft"
import SideBarRight from "./SideBarRight"

const PostPageContainer = () => {
   return (
      <div className="flex gap-7 container">
         <SideBarLeft />
         <PostPageContent />
         <SideBarRight />
      </div>
   )
}

export default PostPageContainer