import { Card, CardContent } from "@/components/ui/shadcn/card";

export function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-muted-foreground">
        {message}
      </CardContent>
    </Card>
  );
}
