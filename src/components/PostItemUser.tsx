import { useGetUserByIdQuery } from "../services/usersApi"
import type { IUser } from "../types/types"
import timeAgo from "../utils/timeAgo"

const PostItemUser = ({ userId, createTimestamp }: { userId: string, createTimestamp: number }) => {
   const { data, isError } = useGetUserByIdQuery(userId)

   const user: IUser | undefined = data

   return (
      <>
         {isError && <p className="alert_dangerous">User is not defined</p>}
         {user &&
            <div className="flex gap-2 items-center cursor-pointer">
               <div className="w-11 h-11 rounded-full overflow-hidden">
                  <img className="w-full h-full" src={user.avatar ? `data:image/png;base64${user.avatar}` : '/user-logo.png'} alt="user logo" />
               </div>
               <div>
                  <p className="text-xxs text-color-primary-text opacity-60">@{user.username}</p>
                  <div className="flex gap-2 pt-1">
                     <p className="text-sm text-color-primary-text">{user.name}</p>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-color-highlight"></div>
                        <p className="text-color-highlight text-xxs">{timeAgo(createTimestamp)}</p>
                     </div>
                  </div>
               </div>
            </div>}
      </>
   )
}

export default PostItemUser