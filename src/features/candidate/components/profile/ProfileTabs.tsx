import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn/tabs";
import { AboutSection } from "./AboutSection";
import type { UserDto } from "@/types/userDto.type";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillSection";
import { SkillFormModal } from "../Modals/SkillModal";
import { SkillModalStore } from "../../store/SkillModal";
import { useUpdateProfileSkill } from "../../hooks/useUpdateProfile";
import { EducationSection } from "./EducationSection";
import ResumeUpload from "./ResumeSection";

export function ProfileTabs({ user }: { user: UserDto }) {

  const updateSkill=useUpdateProfileSkill()
 const {isOpen:isSkillModalOpen,closeModal:setSkillModalClose}=SkillModalStore()

 const handleUpdateSkill=(skills:string[])=>{
 
   updateSkill.mutate(skills)
 }
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="flex gap-2 bg-transparent border-b border-slate-200 rounded-none h-auto p-0 mb-8">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none bg-transparent px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:text-slate-700 shadow-none capitalize"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="experience"
          className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none bg-transparent px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:text-slate-700 shadow-none capitalize"
        >
          Experience
        </TabsTrigger>
        <TabsTrigger
          value="skills"
          className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none bg-transparent px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:text-slate-700 shadow-none capitalize"
        >
          Skills
        </TabsTrigger>
        <TabsTrigger
          value="education"
          className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none bg-transparent px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:text-slate-700 shadow-none capitalize"
        >
          Education
        </TabsTrigger>
        <TabsTrigger
          value="resume"
          className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none bg-transparent px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:text-slate-700 shadow-none capitalize"
        >
          Resume
        </TabsTrigger>
      </TabsList>

      <div className="space-y-6">
        <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
          <AboutSection about={user.candidateData?.about || ""} />
        </TabsContent>
        <TabsContent value="experience" className="mt-0 focus-visible:outline-none">
          <ExperienceSection experience={user.candidateData?.experience || []} />
        </TabsContent>
        <TabsContent value="skills" className="mt-0 focus-visible:outline-none">
          <SkillsSection skills={user.candidateData?.skills || []} />
        </TabsContent>
        <TabsContent value="education" className="mt-0 focus-visible:outline-none">
          <EducationSection Education={user.candidateData?.education || []} />
        </TabsContent>
        <TabsContent value="resume" className="mt-0 focus-visible:outline-none">
          <ResumeUpload resume={user.candidateData?.resume || { url: "", originalName: "", uploadedAt: "" }} />
        </TabsContent>
      </div>

      <SkillFormModal
        open={isSkillModalOpen}
        onClose={() => setSkillModalClose()}
        initialSkills={user.candidateData?.skills || []}
        onSave={(updated: string[]) => handleUpdateSkill(updated)}
      />
    </Tabs>
  );
}
