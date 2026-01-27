import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { motion } from "motion/react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-destructive/10 via-background to-background -z-10" />
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-20">
                        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-destructive/5 blur-[100px] animate-pulse" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg"
                    >
                        <Card className="text-center bg-card/50 backdrop-blur-xl border-border shadow-2xl">
                            <CardContent className="p-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                    className="flex justify-center mb-6"
                                >
                                    <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                                        <AlertTriangle className="h-10 w-10 text-destructive" />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h1 className="text-4xl font-bold tracking-tight mb-2">Something went wrong</h1>
                                    <p className="text-muted-foreground mb-8">
                                        We apologize for the inconvenience. An unexpected error has occurred.
                                    </p>

                                    {this.state.error && (
                                        <div className="bg-muted/50 p-4 rounded-lg mb-8 text-left text-xs font-mono text-muted-foreground overflow-auto max-h-32 border border-border">
                                            {this.state.error.toString()}
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button onClick={this.handleReload} size="lg" className="gap-2 shadow-lg shadow-primary/20">
                                            <RefreshCcw className="h-4 w-4" />
                                            Reload Page
                                        </Button>
                                        <Button variant="outline" onClick={this.handleHome} size="lg" className="gap-2">
                                            <Home className="h-4 w-4" />
                                            Back to Home
                                        </Button>
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}
