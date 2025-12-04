import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn/tabs";
import { AboutSection } from "./AboutSection";
import type { UserDto } from "@/types/userDto.type";
import { ExperienceSection } from "./ExperienceSection";

export function ProfileTabs({ user }: { user: UserDto }) {
 
  return (
    <Tabs defaultValue="overview" className="mt-6">
      <TabsList>
        <TabsTrigger value="overview">About</TabsTrigger>
        <TabsTrigger value="experience">Resume & Experience</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
      </TabsList>

      <TabsContent value="overview"><AboutSection about={user.candidateData?.about||""}/></TabsContent>
      <TabsContent value="experience"><ExperienceSection experience={user.candidateData?.experience||[]}/></TabsContent>
      <TabsContent value="skills">Skills Section</TabsContent>
      <TabsContent value="education">Education Section</TabsContent>
      <TabsContent value="portfolio">Portfolio Section</TabsContent>
    </Tabs>
  );
}
