import SiteHeader from "../(site)/components/SiteHeader";
import SiteFooter from "../(site)/components/SiteFooter";
import FloatingBookingButton from "@/components/FloatingBookingButton";

export default function PatienteninfosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <FloatingBookingButton />
      <SiteFooter />
    </>
  );
}
