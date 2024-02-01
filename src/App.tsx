import Navbar from "./components/Navbar";
import WordleBoard from "./components/WordleBoard";

export default function App() {
  return (
    <div className="flex flex-col items-center mx-auto">
      <Navbar />
      <WordleBoard />
    </div>
  );
}
