import { useGetPostsQuery } from "../services/postsApi"
import { useAppSelector } from "../store/hooks"
import type { IPost, IUser } from "../types/types"
import PostBuilder from "./PostBuilder"
import PostItem from "./PostItem"

const HomeContent = () => {
   const user: IUser | null = useAppSelector((state) => state.user.user)
   const { data, isLoading, isFetching, isSuccess, isError } = useGetPostsQuery()

   const posts: IPost[] | undefined = data

   return (
      <div className="w-2/4 pt-5">
         {user && <div className="mb-5 p-3 bg-color-primary-bg rounded-2xl">
            <PostBuilder type={'post'} />
         </div>}
         {posts && posts.map(item => (
            <PostItem key={item.id} {...item} />
         ))}
      </div>
   )
}

export default HomeContent