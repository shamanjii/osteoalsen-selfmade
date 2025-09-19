import SiteHeader from "../(site)/components/SiteHeader";
import SiteFooter from "../(site)/components/SiteFooter";

export default function TerminbuchungLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <SiteHeader />
            {children}
            <SiteFooter />
        </div>
    );
}