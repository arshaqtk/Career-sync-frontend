import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import type { Education } from "@/features/candidate/types/Education.types";

interface EducationCardProps {
    education?: Education[];
}

export default function EducationCard({ education }: EducationCardProps) {
    if (!education?.length) return null;

    return (
        <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black mt-6">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
                <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-4">
                    {education.map((edu) => (
                        <div key={edu._id} className="relative pl-8">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm" />

                            <div className="space-y-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                                    <h3 className="font-bold text-gray-900">{edu.standard}</h3>
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-green-600">{edu.school}</p>

                                <div className="flex flex-wrap gap-4 mt-2">
                                    {edu.location && (
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <MapPin className="h-3 w-3" />
                                            {edu.location}
                                        </div>
                                    )}
                                    {edu.gradeOrPercentage && (
                                        <div className="text-xs font-medium text-gray-600">
                                            Grade: <span className="text-gray-900">{edu.gradeOrPercentage}</span>
                                        </div>
                                    )}
                                </div>

                                {edu.description && (
                                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
