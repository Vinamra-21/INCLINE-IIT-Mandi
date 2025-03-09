import EcoPulse from "~/components/EcoPulse";

export default function home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <EcoPulse />
      </main>
    </div>
  );
}
