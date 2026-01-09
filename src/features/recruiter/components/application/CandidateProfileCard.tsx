import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";
import type { ApplicantDTO } from "../../dto/applicant.dto";
import { Button } from "@/components/ui/shadcn/button";
import { useNavigate } from "react-router-dom";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "@/features/chat/store/chat.store";

type CandidateProfileProps = {
  candidate: ApplicantDTO["candidateId"];
};

export function CandidateProfileCard({ candidate }: CandidateProfileProps) {
  const navigate = useNavigate();
  const socket = getSocket();
  const { setConversationId, setMessages, setActiveChatId } = useChatStore();

  const openChat = (receiverId: string) => {
    if (!socket.connected) socket.connect();

    setActiveChatId(receiverId);
    socket.emit(
      "chat:joinConversation",
      receiverId,
      (res: { success: boolean; conversationId?: string }) => {
        if (res.success && res.conversationId) {
          setConversationId(res.conversationId);
          setMessages([]);
          navigate("/recruiter/chat");
        }
      }
    );
  };

  return (
    <Card className="border-muted/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          Candidate Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-muted">
            <AvatarImage src={candidate.profilePictureUrl} />
            <AvatarFallback className="text-lg font-semibold">
              {candidate.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-tight">
              {candidate.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {candidate.experience} years experience
            </p>

            <div className="text-sm text-muted-foreground space-y-0.5">
              <p>{candidate.email}</p>
              <p>{candidate.phone}</p>
              <p>{candidate.location}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-row gap-3 md:flex-col md:items-end">
          {candidate._id && (
            <Button
              variant="outline"
              className="min-w-[140px]"
              onClick={() => openChat(candidate._id!)}
            >
              Send Message
            </Button>
          )}

          <Button
            variant="secondary"
            className="min-w-[140px]"
            onClick={() =>
              navigate(`/recruiter/candidates/${candidate._id}`)
            }
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
