const SearchBarItem = () => {
   return (
      <div className="flex items-center p-2">
         <img src="/user-logo.png" alt="user logo" />
         <div className="pl-2">
            <p className="text-xxs text-color-primary-text opacity-60">@evgenledo</p>
            <p className="text-sm text-color-primary-text pt-1">Evgen Ledo</p>
         </div>
      </div>
   )
}

export default SearchBarItem