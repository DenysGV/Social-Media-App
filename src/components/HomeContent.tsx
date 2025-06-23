import { useGetPostsQuery } from "../services/postsApi"
import { useAppSelector } from "../store/hooks"
import type { IPost, IUser } from "../types/types"
import PostBuilder from "./PostBuilder"
import PostItem from "./PostItem"

const HomeContent = () => {
   const user: IUser | null = useAppSelector((state) => state.user.user)
   const { data, isLoading, isFetching } = useGetPostsQuery()

   const posts: IPost[] | undefined = data

   if (isFetching || isLoading) {
      return <div className="w-2/4 pt-5">
         <div className="animate-spin w-20 h-20 rounded-full border border-dashed border-color-primary-text mx-auto"></div>
      </div>
   }

   return (
      <div className="w-2/4 pt-5">
         {user && <div className="mb-5 p-3 bg-color-primary-bg rounded-2xl">
            <PostBuilder type={'post'} />
         </div>}
         {posts && [...posts].sort((a, b) => b.createTimestamp - a.createTimestamp).map(item => (
            <PostItem key={item.id} {...item} />
         ))}
      </div>
   )
}

export default HomeContent