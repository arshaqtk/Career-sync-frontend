import React from 'react';
import {
  CalendarCheck,
  CalendarClock,
  Clock,
  XCircle,
  CheckCircle2,
} from "lucide-react";

type InterviewStatus = "Pending" | "Scheduled" | "Rescheduled" | "Completed" | "Cancelled";

type TimelineItem = {
  status: InterviewStatus;
  changedAt: string;
  note?: string;
};

const statusConfig: Record<
  InterviewStatus,
  {
    label: string;
    icon: React.ElementType;
    colorClasses: string;
    bgClasses: string;
    borderClasses: string;
    pulseClasses: string;
  }
> = {
  Pending: {
    label: "Pending",
    icon: Clock,
    colorClasses: "text-yellow-700",
    bgClasses: "bg-yellow-50",
    borderClasses: "border-yellow-200",
    pulseClasses: "bg-yellow-500",
  },
  Scheduled: {
    label: "Scheduled",
    icon: CalendarCheck,
    colorClasses: "text-blue-700",
    bgClasses: "bg-blue-50",
    borderClasses: "border-blue-200",
    pulseClasses: "bg-blue-500",
  },
  Rescheduled: {
    label: "Rescheduled",
    icon: CalendarClock,
    colorClasses: "text-indigo-700",
    bgClasses: "bg-indigo-50",
    borderClasses: "border-indigo-200",
    pulseClasses: "bg-indigo-500",
  },
  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    colorClasses: "text-green-700",
    bgClasses: "bg-green-50",
    borderClasses: "border-green-200",
    pulseClasses: "bg-green-500",
  },
  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    colorClasses: "text-red-700",
    bgClasses: "bg-red-50",
    borderClasses: "border-red-200",
    pulseClasses: "bg-red-500",
  },
};

export function InterviewTimeline({ 
  timeline, 
  onReschedule, 
  currentStatus 
}: {
  timeline: TimelineItem[];
  currentStatus: InterviewStatus;
  onReschedule?: () => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Interview Timeline</h2>
      </div>

      <div className="p-6 pt-4">
        <div className="relative">
          {timeline.map((item, index) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;
            const isLast = index === timeline.length - 1;
            const isRecent = index === timeline.length - 1 || index === timeline.length - 2;

            return (
              <div
                key={index}
                className={`relative ${!isLast ? 'pb-8' : ''}`}
                style={{ 
                  animation: `fadeIn 0.5s ease-out ${index * 100}ms both`
                }}
              >
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute left-5 top-11 h-full w-0.5 bg-gradient-to-b from-gray-300 to-gray-200" />
                )}

                <div className="flex gap-4">
                  {/* Icon Container */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 ${config.bgClasses} ${config.borderClasses} ${isRecent ? 'shadow-md ring-2 ring-offset-2 ' + config.borderClasses : ''}`}
                    >
                      <Icon className={`h-5 w-5 ${config.colorClasses}`} />
                    </div>
                    
                    {/* Pulse effect for most recent */}
                    {index === timeline.length - 1 && currentStatus !== "Completed" && currentStatus !== "Cancelled" && (
                      <span 
                        className={`absolute inset-0 h-10 w-10 rounded-full animate-ping opacity-20 ${config.pulseClasses}`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <div className={`rounded-lg border p-4 transition-all duration-300 ${config.bgClasses} ${config.borderClasses} ${isRecent ? 'shadow-sm' : ''}`}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className={`font-semibold text-sm ${config.colorClasses}`}>
                            {config.label}
                          </h4>
                          <time className="text-xs text-gray-600 mt-0.5 block">
                            {new Date(item.changedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </time>
                        </div>
                      </div>

                      {item.note && (
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                          {item.note}
                        </p>
                      )}

                      {/* Reschedule Action */}
                      {item.status === "Rescheduled" &&
                        currentStatus !== "Completed" &&
                        currentStatus !== "Cancelled" &&
                        onReschedule && (
                          <button
                            className="mt-3 h-8 px-3 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors flex items-center gap-1.5"
                            onClick={onReschedule}
                          >
                            <CalendarClock className="h-3.5 w-3.5" />
                            Reschedule again
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Demo Component
export default function Demo() {
  const sampleTimeline: TimelineItem[] = [
    {
      status: "Pending",
      changedAt: "2024-01-15T10:00:00Z",
      note: "Interview request submitted by hiring manager"
    },
    {
      status: "Scheduled",
      changedAt: "2024-01-16T14:30:00Z",
      note: "Interview scheduled for January 25th at 2:00 PM with Sarah Johnson"
    },
    {
      status: "Rescheduled",
      changedAt: "2024-01-20T09:15:00Z",
      note: "Candidate requested reschedule due to conflict. New time: January 27th at 3:00 PM"
    },
    {
      status: "Completed",
      changedAt: "2024-01-27T16:00:00Z",
      note: "Interview completed successfully. Feedback submitted by interviewer."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Status</h1>
          <p className="text-gray-600">Track the progress of your interview</p>
        </div>
        
        <InterviewTimeline 
          timeline={sampleTimeline}
          currentStatus="Completed"
          onReschedule={() => alert('Reschedule clicked!')}
        />
      </div>
    </div>
  );
}