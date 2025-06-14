import SearchBarItem from "./SearchBarItem"

const SearchBar = () => {
   return (
      <div className="relative w-full">
         <input type="text" placeholder="# Explore" className="w-full" />
         <div className="bg-color-secondary-bg rounded-2xl mt-3 hidden">
            <SearchBarItem />
         </div>
      </div>
   )
}

export default SearchBar

// border-2 border-solid border-color-highlight