import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export default function PortfolioCard({ url }: { url?: string }) {
  if (!url) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Portfolio & Links
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Button
          variant="outline"
          className="w-full justify-between gap-2 border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-all group"
          onClick={() => window.open(url, "_blank")}
        >
          <span className="truncate text-sm font-medium">{url.replace(/(^\w+:|^)\/\//, "")}</span>
          <ExternalLink className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-600" />
        </Button>
      </CardContent>
    </Card>
  );
}
