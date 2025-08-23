import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen max-w-2xl flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto">MessageWindow</div>
      <footer className="p-4">ChatInput</footer>
    </main>
  );
}
