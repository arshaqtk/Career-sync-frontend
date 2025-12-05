import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import { candidateRoutes } from "./candidate.routes";
import { recruiterRoutes } from "./recruiter.routes";

export const router = createBrowserRouter([
  ...candidateRoutes,
  ...authRoutes,
  ...recruiterRoutes,
]);
