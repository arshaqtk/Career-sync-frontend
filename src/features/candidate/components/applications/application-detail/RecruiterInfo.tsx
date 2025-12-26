import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"

interface Props{
    name:string;
    email:string;
}

export const RecruiterInfoCard=({ name,email }: Props)=> {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruiter</CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-1">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </CardContent>
    </Card>
  )
}
