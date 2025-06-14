import type { ReactElement } from "react"

const Modal = ({ open, setOpen, children }: { children: ReactElement, open: boolean, setOpen: Function }) => {
   return (
      <div className={`fixed top-0 left-0 w-full h-full z-30 ${open ? 'block' : 'hidden'}`}>
         <div className="w-full h-full flex justify-center items-center">
            <div className="w-96 bg-color-primary-bg p-3 rounded-2xl relative">
               <div onClick={() => { setOpen(false) }} className=" cursor-pointer bg-color-secondary-bg rounded-full w-5 h-5 flex justify-center items-center absolute top-3 right-3">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path className="stroke-color-primary-text" d="M1 1L10 10M1 10L10 1" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
               </div>
               {children}
            </div>
         </div>
         <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0 -z-10"></div>
      </div>
   )
}

export default Modal