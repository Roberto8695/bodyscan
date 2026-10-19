import { Footer } from "@/components/layout/public/footer";
import { Navbar } from "@/components/layout/public/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <a
        href="#contenido-principal"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 motion-reduce:transition-none"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido-principal" tabIndex={-1} className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
