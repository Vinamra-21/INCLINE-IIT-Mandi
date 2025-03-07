import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
}
