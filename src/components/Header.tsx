import { Link } from "react-router-dom"
import ThemePicker from "./ThemePicker"
import SearchBar from "./SearchBar"

const Header = () => {
   return (
      <div className="container">
         <div className="flex justify-between">
            <div className="flex gap-4 w-1/4 pr-3.5">
               <Link to="/">
                  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect width="35" height="35" rx="17.5" fill="white" />
                     <path d="M23.3088 11.8382H13.9977C13.2537 11.8382 12.5191 11.6722 11.8474 11.3522L8.82413 9.91203C8.18512 9.65643 7.53935 10.2653 7.75699 10.9182L11.728 22.8312C12.4086 24.8729 14.3193 26.25 16.4714 26.25H23.3088C26.0702 26.25 28.3088 24.0114 28.3088 21.25V16.8382C28.3088 14.0768 26.0702 11.8382 23.3088 11.8382Z" fill="black" stroke="black" />
                  </svg>
               </Link>
               <SearchBar />
            </div>
            <ThemePicker />
         </div>
      </div>
   )
}

export default Header