export default function WelcomeHeader({name}:{name:string}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold">Welcome back, {name}! 👋</h1>
      <p className="text-gray-500 mt-1">
        Here's what's happening with your job search
      </p>
    </div>
  );
}
