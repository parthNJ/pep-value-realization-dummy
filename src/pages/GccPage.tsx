import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Footer } from "@/components/dashboard/Footer";

export function GccPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Coming Soon</p>
          <h1 className="mt-2 text-2xl font-semibold">GCC Business Case</h1>
          <p className="mt-2 text-sm text-muted-foreground">This section is under development.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
