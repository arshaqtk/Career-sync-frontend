import { Link } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Briefcase } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 to-slate-900 px-4">
      <Card className="w-full max-w-lg text-center bg-slate-900/80 border-slate-800 shadow-xl">
        <CardContent className="p-10">
          <div className="flex justify-center mb-6 text-sky-400">
            <Briefcase size={52} />
          </div>

          <h1 className="text-7xl font-extrabold text-sky-400">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Page Not Found
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            The page you’re trying to access doesn’t exist or has been moved.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link to="/">Go to Home</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
