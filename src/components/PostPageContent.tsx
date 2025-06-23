import { useParams } from "react-router-dom"
import PostItem from "./PostItem"
import { useGetPostByIdQuery } from "../services/postsApi"

const PostPageContent = () => {
   const postId: string | undefined = useParams().id

   if (!postId) {
      return <div className="w-2/4 pt-5">
         <p className="text-sm text-color-primary-text opacity-60 pt-5">Have no post id</p>
      </div>
   }

   const { data: post, isLoading } = useGetPostByIdQuery(postId)

   return (
      <div className="w-2/4 pt-5">
         {isLoading && <div className="animate-spin w-20 h-20 rounded-full border border-dashed border-color-primary-text mx-auto"></div>}
         {post && <PostItem {...post} />}
         {!post && !isLoading && <p className="text-sm text-color-primary-text opacity-60 pt-5">Cant get post data, please try again</p>}
      </div>
   )
}

export default PostPageContent