import SiteHeader from "../(site)/components/SiteHeader";
import SiteFooter from "../(site)/components/SiteFooter";

export default function BehandlungenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SiteHeader />
      <main className="pt-20 overflow-x-hidden max-w-full">{children}</main>
      <SiteFooter />
    </div>
  );
}
