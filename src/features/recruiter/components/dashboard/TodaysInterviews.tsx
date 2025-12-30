import InterviewCard from "@/features/candidate/components/cards/interview-card";

export function TodayInterviews() {
//   const interview = {
//     name: "John Doe",
//     title: "Senior Frontend Developer",
//     time: "2:00 PM Today",
//     type: "Technical"
//   };

  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="text-xl font-semibold mb-4">Today's Interviews</h3>

      <InterviewCard 
       />
    </div>
  );
}
