
export default function LoginHeader() {
  return (
    <div className="text-center space-y-2 mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white font-bold text-2xl shadow-lg">
        CS
      </div>

      <h1 className="text-3xl font-bold text-[var(--text-primary)]">
        Welcome Back
      </h1>

      <p className="text-[var(--text-secondary)]">
        Sign in to continue to CareerSync
      </p>
    </div>
  );
}
