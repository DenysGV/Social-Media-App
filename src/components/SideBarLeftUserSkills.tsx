import SideBarLeftUserSkillsItem from "./SideBarLeftUserSkillsItem"

const SideBarLeftUserSkills = ({ skills }: { skills?: string[] }) => {

   if (!skills) {
      return
   }

   return (
      <div className="pt-5">
         <p className="text-base pb-2.5 text-color-primary-text">Skills</p>
         <div className="flex flex-wrap gap-2.5">
            {skills.length ?
               skills.map(item => (
                  <SideBarLeftUserSkillsItem skillName={item} type="fixed" />
               )) :
               <p className="text-color-primary-text text-xs">Add skills at profile settings</p>
            }
         </div>
      </div>
   )
}

export default SideBarLeftUserSkills