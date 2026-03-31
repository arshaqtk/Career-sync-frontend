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
import { Mail, Phone, MapPin, User, MessageSquare, ExternalLink } from "lucide-react";

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
    <Card className="bg-card border border-border shadow-sm overflow-hidden">
      <CardHeader className="border-b border-border py-4">
        <CardTitle className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
          <User className="h-4 w-4" />
          Candidate Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* LEFT SECTION */}
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage src={candidate.profilePicture?.url} />
              <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
                {candidate.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground leading-tight">
                  {candidate.name}
                </h3>
                {/* <p className="text-sm font-medium text-blue-600 mt-1">
                  {candidate.experience} Years of Experience
                </p> */}
              </div>

              <div className="grid grid-cols-1 gap-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground/70" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-muted-foreground/70" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground/70" />
                  <span>{candidate.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - ACTIONS */}
          <div className="flex flex-col gap-2 min-w-[160px]">
            {candidate._id && (
              <Button
                variant="outline"
                className="w-full justify-start gap-2 hover:bg-muted/50"
                onClick={() => openChat(candidate._id!)}
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
            )}

            <Button
              variant="secondary"
              className="w-full justify-start gap-2 bg-muted hover:bg-muted/80 text-foreground/80 border-0"
              onClick={() =>
                navigate(`/recruiter/candidates/${candidate._id}`)
              }
            >
              <ExternalLink className="h-4 w-4" />
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
