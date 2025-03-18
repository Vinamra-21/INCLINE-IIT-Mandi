import Features from "~/components/Features";
export default function home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Features />
      </main>
    </div>
  );
}
