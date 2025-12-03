import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ProfileTabs() {
  return (
    <Tabs defaultValue="overview" className="mt-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="experience">Resume & Experience</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">Overview Section</TabsContent>
      <TabsContent value="experience">Experience Section</TabsContent>
      <TabsContent value="skills">Skills Section</TabsContent>
      <TabsContent value="education">Education Section</TabsContent>
      <TabsContent value="portfolio">Portfolio Section</TabsContent>
    </Tabs>
  );
}
