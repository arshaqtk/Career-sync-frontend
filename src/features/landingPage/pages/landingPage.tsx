import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/NavBar";
import { FinalCTA } from "../components/sections/FinalCTA";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { PromoCards } from "../components/sections/PromoCards";
import { WhyCareerSync } from "../components/sections/WhyCareerSync";


export function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            <Navbar />
            <main className="flex-1">
                <Hero/>
                {/* <TrustedCompanies /> */}
                <WhyCareerSync />
                <HowItWorks />
                <PromoCards />
                {/* <Testimonials /> */}
                <FinalCTA />
            </main>
            <Footer />
        </div>
    )
}
