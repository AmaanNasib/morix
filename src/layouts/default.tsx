import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header section */}
        <Header />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {/* <div className="relative mb-8">
            <GradientBanner />
          </div> */}
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full flex items-center justify-center py-3 text-gray-500 text-sm" />
      </div>
    </div>
  );
}
