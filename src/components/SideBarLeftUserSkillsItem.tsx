const SideBarLeftUserSkillsItem = ({ skillName, type, id, setSkills }: { skillName: string, type: string, id?: number, setSkills?: Function }) => {
   const removeSkillHandler = () => {
      if (setSkills && id) {
         setSkills((prev: string[]) => prev.filter((_, index) => ++index != id))
      }
   }

   return (
      <>
         {type == "fixed" && <div className="bg-color-secondary-bg px-2.5 py-2 text-color-primary-text text-xxs rounded-lg">{skillName}</div>}
         {type == 'editable' && <div className="flex gap-2 items-center px-2 py-1 bg-color-secondary-bg w-fit rounded-2xl">
            <p className="text-color-primary-text text-xxs">{skillName}</p>
            <div onClick={removeSkillHandler} className="cursor-pointer">
               <svg width="6" height="6" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-color-primary-text" d="M1 1L10 10M1 10L10 1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
         </div>}
      </>
   )
}

export default SideBarLeftUserSkillsItem