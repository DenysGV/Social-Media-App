import { useGetPostsQuery } from "../services/postsApi"
import type { IPost } from "../types/types"
import PostItem from "./PostItem"

const SideBarRight = () => {
   const { data, isLoading, isFetching } = useGetPostsQuery()

   const posts: IPost[] | undefined = data

   if (isFetching || isLoading) {
      return <div className="w-1/ pt-5">
         <div className="animate-spin w-20 h-20 rounded-full border border-dashed border-color-primary-text mx-auto"></div>
      </div>
   }

   return (
      <div className="bg-color-primary-bg rounded-2xl p-3 w-1/4 mt-5">
         <p className="text-sm text-color-primary-text pb-3">Latest</p>
         {posts && [...posts]
            .sort((a, b) => b.createTimestamp - a.createTimestamp)
            .slice(0, 4)
            .map(item => (
               <PostItem isSidebarItem={true} key={item.id} {...item} />
            ))}
      </div>
   )
}

export default SideBarRight