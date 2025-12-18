import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn/card";


export const RecruiterCard=()=>{
return (<Card>
  <CardHeader>
    <CardTitle>Your Recruiter</CardTitle>
  </CardHeader>

  <CardContent className="flex items-center gap-4">
    <Avatar>
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="font-medium">Sarah Johnson</p>
      <p className="text-sm text-muted-foreground">Senior Recruiter</p>
    </div>
  </CardContent>

  <CardFooter>
    <Button variant="outline" className="w-full">
      Send Message
    </Button>
  </CardFooter>
</Card>
)
}
