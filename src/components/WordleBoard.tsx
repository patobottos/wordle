import { useState, useEffect } from "react";
import axios from "axios";
import { getRandomWordEng } from "../utilities/word-utils";
import WordRow from "./Grid/WordRow";

export default function WordleBoard() {
  const [randomWord, setRandomWord] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");

  const selectNewWord = async () => {
    const newWord = getRandomWordEng();
    setRandomWord(newWord);
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;
    const newDefinition = await axios
      .get(url)
      .then((res) => res.data[0].meanings[0].definitions[0].definition);
    setDefinition(newDefinition);
  };

  useEffect(() => {
    selectNewWord();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <WordRow guessingWord="water" />
      <WordRow guessingWord="rover" />
      <WordRow guessingWord="robot" />
      <WordRow guessingWord="close" />
      <WordRow guessingWord="maths" />
      <WordRow guessingWord="inner" />

      <span className="mx-10 w-25 bg-orange-300 margin-auto">
        The solution is: {randomWord}
      </span>
      <br />
      <span className="mx-10 w-25 bg-slate-300">Meaning: {definition}</span>
    </div>
  );
}
