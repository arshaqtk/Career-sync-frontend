import heroillustration from "../../../assets/images/amico.svg"
// import { Briefcase, Building2, Users, BriefcaseBusiness } from 'lucide-react';
// import { StatCard } from '../components/Landing/Home/StatCard';
import { SearchHero } from '../components/Landing/Home/SearchHero';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      {/* <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full" />
          <span className="text-xl font-bold">JobMatrix</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-600">
          <a href="#" className="text-blue-600 font-medium">Home</a>
          <a href="#">Find jobs</a>
          <a href="#">Blog</a>
          <a href="#">Contact Us</a>
          <a href="#">Build Your CV</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium">Post a Job</button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">Find Job</button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
            Discover Your <br /> 
            Dream Job with <br />
            <span className="text-blue-600">Career Sync</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-md">
            Discover top opportunities with JobMatrix. Connect with leading employers and take the next step in your career today.
          </p>
          <SearchHero />
        </div>

        <div className="relative flex justify-center">
          {/* Replace with your local image path */}
          <img 
            src={heroillustration} 
            alt="Job Search Illustration" 
            className="w-full max-w-lg object-contain"
          />
        </div>
      </main>

      {/* Stats Section */}
      {/* <div className="bg-slate-50/50 py-12 border-t">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between gap-8">
          <StatCard icon={Briefcase} value="23,456" label="Live Job" />
          <StatCard icon={Building2} value="60,453" label="Companies" />
          <StatCard icon={Users} value="3,45,879" label="Candidates" />
          <StatCard icon={BriefcaseBusiness} value="3,45,879" label="New Job" />
        </div>
      </div> */}
    </div>
  );
}