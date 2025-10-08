import SiteHeader from "../(site)/components/SiteHeader";
import SiteFooter from "../(site)/components/SiteFooter";

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
