import Navbar from "./components/Navbar";
import WordleBoard from "./components/WordleBoard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen items-center mx-auto">
      <Navbar />
      <WordleBoard />
      <Footer />
    </div>
  );
}
