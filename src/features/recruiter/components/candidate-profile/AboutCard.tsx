import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { FileText } from "lucide-react";

export default function AboutCard({ about }: { about?: string }) {
  if (!about) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          About Candidate
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed italic">
            "{about}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
