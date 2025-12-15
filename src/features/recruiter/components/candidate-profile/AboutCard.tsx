import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";

export default function AboutCard({ about }: { about?: string }) {
  if (!about) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-line">{about}</p>
      </CardContent>
    </Card>
  );
}
