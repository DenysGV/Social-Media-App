import { useState } from "react"
import SearchBarItem from "./SearchBarItem"
import { useSearchUserQuery } from "../services/usersApi"

const SearchBar = () => {
   const [search, setSearch] = useState<string>('')
   const { data: users, isLoading } = useSearchUserQuery(search)

   return (
      <div className="relative w-full">
         <input type="text" placeholder="# Explore" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="w-full" />
         {users && search && <div className="bg-color-secondary-bg rounded-2xl mt-3 absolute w-full z-10">
            {isLoading && <div className="animate-spin w-10 h-10 rounded-full border border-dashed border-color-primary-text mx-auto"></div>}
            {users.length ?
               users.map(item => <SearchBarItem key={item.id} {...item} />) :
               <p className="text-sm text-color-primary-text opacity-60 p-3">No users by this query</p>}
         </div>}
      </div>
   )
}

export default SearchBar