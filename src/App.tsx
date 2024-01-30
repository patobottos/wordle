import Keyboard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import WordleBoard from "./components/WordleBoard";

export default function App() {
  return (
    <div className="flex flex-col items-center m-auto">
      <Navbar />
      <WordleBoard />
      <Keyboard />
    </div>
  );
}
