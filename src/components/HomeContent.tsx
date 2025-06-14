import PostBuilder from "./PostBuilder"
import PostItem from "./PostItem"

const HomeContent = () => {
   return (
      <div className="w-2/4 pt-5">
         <div className="p-3 bg-color-primary-bg rounded-2xl">
            <PostBuilder type={'post'} />
         </div>
         <PostItem type="post" />
         <PostItem type="repost" />
      </div>
   )
}

export default HomeContent