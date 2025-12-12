import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

export function ResumeModal({ resumeUrl }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Resume</Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resume Preview</DialogTitle>
        </DialogHeader>

        <iframe
          src={resumeUrl}
          className="w-full h-[80vh] border rounded-md"
        />
      </DialogContent>
    </Dialog>
  );
}
