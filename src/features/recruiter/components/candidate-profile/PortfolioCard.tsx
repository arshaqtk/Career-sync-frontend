import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { ExternalLink } from "lucide-react";

export default function PortfolioCard({ url }: { url?: string }) {
  if (!url) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio</CardTitle>
      </CardHeader>

      <CardContent>
        <a
          href={url}
          target="_blank"
          className="text-blue-600 underline flex items-center gap-1"
        >
          {url} <ExternalLink size={14} />
        </a>
      </CardContent>
    </Card>
  );
}
