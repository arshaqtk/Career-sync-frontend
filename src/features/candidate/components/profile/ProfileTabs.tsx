import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn/tabs";
import { AboutSection } from "./AboutSection";
import type { UserDto } from "@/types/userDto.type";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillSection";
import { SkillsEditModal } from "../Modals/skillModal";
import { SkillModalStore } from "../../store/SkillModal";
import { useUpdateProfileSkill } from "../../hooks/useUpdateProfile";
import { EducationSection } from "./EducationSection";
import ResumeUpload from "./ResumeSection";

export function ProfileTabs({ user }: { user: UserDto }) {

  const updateSkill=useUpdateProfileSkill()
 const {isOpen:isSkillModalOpen,closeModal:setSkillModalClose}=SkillModalStore()

 const handleUpdateSkill=(skills:string[])=>{
 console.log(skills)
   updateSkill.mutate(skills)
 }
  return (
    <Tabs defaultValue="overview" className="mt-6 flex flex-col gap-6 ">
      <TabsList className="flex gap-8">
        <TabsTrigger value="overview">About</TabsTrigger>
        <TabsTrigger value="experience">Resume & Experience</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="resume">Resume</TabsTrigger>
      </TabsList>

      <TabsContent value="overview"><AboutSection about={user.candidateData?.about||""}/></TabsContent>
      <TabsContent value="experience"><ExperienceSection experience={user.candidateData?.experience||[]}/></TabsContent>
      <SkillsEditModal
        open={isSkillModalOpen}
        onClose={() => setSkillModalClose()}
        initialSkills={user.candidateData?.skills||[]}
        onSave={(updated) => handleUpdateSkill(updated)}
      />
      <TabsContent value="skills"><SkillsSection skills={user.candidateData?.skills||[]}/></TabsContent>
      <TabsContent value="education"><EducationSection Education={user.candidateData?.education||[]}/></TabsContent>
      <TabsContent value="resume"><ResumeUpload resume={user.candidateData?.resume||{}}/></TabsContent>
    </Tabs>
  );
}
