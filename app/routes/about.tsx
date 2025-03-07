import AboutUs from "~/components/aboutUs";
export default function home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <AboutUs />
      </main>
    </div>
  );
}
