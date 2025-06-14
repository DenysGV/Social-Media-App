import SideBarLeftUserSkillsItem from "./SideBarLeftUserSkillsItem"

const SideBarLeftUserSkills = () => {
   return (
      <div className="pt-5">
         <p className="text-base pb-2.5 text-color-primary-text">Skills</p>
         <div className="flex flex-wrap gap-2.5">
            <SideBarLeftUserSkillsItem skillName={`UI/UX Design`} type="fixed" />
            <SideBarLeftUserSkillsItem skillName={`UI/UX Design`} type="fixed" />
            <SideBarLeftUserSkillsItem skillName={`UI/UX Design`} type="fixed" />
         </div>
      </div>
   )
}

export default SideBarLeftUserSkills