import { Link } from "react-router-dom"
import type { IUser } from "../types/types"

const SearchBarItem = ({ name, username, id, avatar }: IUser) => {
   return (
      <Link to={`user/${id}`} className="flex items-center p-2 border border-color-highlight border-solid rounded-2xl">
         <img className="w-10 h-10 rounded-full overflow-hidden" src={avatar ? `data:image/png;base64${avatar}` : '/user-logo.png'} alt="user logo" />
         <div className="pl-2">
            <p className="text-xxs text-color-primary-text opacity-60">@{username}</p>
            <p className="text-sm text-color-primary-text pt-1">{name}</p>
         </div>
      </Link>
   )
}

export default SearchBarItem