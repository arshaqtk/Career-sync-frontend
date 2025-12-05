// import { ApplicationItem } from "./applicationItem";

export function RecentApplications() {
//   const apps = [
//     {
//       name: "Sarah Wilson",
//       title: "Senior Frontend Developer",
//       experience: "6 years",
//       applied: "2 hours ago",
//       avatar: "SW"
//     },
//     {
//       name: "Alex Chen",
//       title: "DevOps Engineer",
//       experience: "4 years",
//       applied: "5 hours ago",
//       avatar: "AC"
//     },
//   ];

  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold">Recent Applications</h3>
        <button className="text-indigo-600 text-sm">View all</button>
      </div>

      <div className="space-y-4">
        {/* {apps.map(app => (
          <ApplicationItem key={app.name} {...app} />
        ))} */}
      </div>
    </div>
  );
}
