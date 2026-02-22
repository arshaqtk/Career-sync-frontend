import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Loader2,
    Building2,
    Globe,
    MapPin,
    Factory,
    Users,
    Calendar,
    ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/shadcn/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn/form";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import { useCreateCompany } from "../../hooks/useCompanyOnboarding";
import { createCompanySchema } from "../../schemas/createCompany.schema";

type CreateCompanyFormValues = z.infer<typeof createCompanySchema>;

export function CreateCompanyForm() {
    const createCompanyMutation = useCreateCompany();

    const form = useForm<CreateCompanyFormValues>({
        resolver: zodResolver(createCompanySchema),
        defaultValues: {
            name: "",
            website: "",
            location: "",
            description: "",
            industry: "",
            size: "",
            foundedYear: undefined,
        },
    });

    const onSubmit = (data: CreateCompanyFormValues) => {
        createCompanyMutation.mutate(data);
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900">Register New Company</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                    Create a new company profile. You'll be set as the administrator.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Row 1: Name + Website */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-slate-700">
                                        Company Name
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="Acme Corp"
                                                className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-slate-700">
                                        Website <span className="text-slate-400 font-normal">(Optional)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="https://example.com"
                                                className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Row 2: Industry + Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-slate-700">Industry</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Factory className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="e.g. Technology"
                                                className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-slate-700">Company Size</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Users className="h-4 w-4 text-slate-400" />
                                                    <SelectValue placeholder="Select size" />
                                                </div>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1-10">1–10 employees</SelectItem>
                                            <SelectItem value="11-50">11–50 employees</SelectItem>
                                            <SelectItem value="51-200">51–200 employees</SelectItem>
                                            <SelectItem value="201-500">201–500 employees</SelectItem>
                                            <SelectItem value="500+">500+ employees</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Row 3: Founded Year + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="foundedYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-slate-700">
                                        Founded Year <span className="text-slate-400 font-normal">(Optional)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                type="number"
                                                placeholder="2024"
                                                className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                                value={field.value ?? ""}
                                                onChange={(e) => {
                                                    const val = e.target.valueAsNumber;
                                                    field.onChange(Number.isNaN(val) ? undefined : val);
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-slate-700">
                                        Headquarters Location
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="New York, NY"
                                                className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-slate-700">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about your company, its mission, and culture..."
                                        className="resize-none border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        rows={4}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={createCompanyMutation.isPending}
                            className="flex items-center gap-2 px-6 h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                            {createCompanyMutation.isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    Create Company
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
