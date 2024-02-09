import { describe, expect, test } from "vitest";
import App from "./App";
import { useStore } from "./utilities/store";
import { render, screen } from "./test/test-utils";
import WordRow from "./components/Grid/WordRow";

describe("App", () => {
  test("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Wordle Adventure/i)).toBeDefined();
  });

  test("it shows empty state", () => {
    useStore.getState().newGame([]);
    render(<App />);
    expect(screen.queryByText("Game over")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(72);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });

  test("it shows one row of guesses", () => {
    useStore.getState().newGame(["hello"]);
    render(<WordRow guessingWord="hello" result={[0, 0, 0, 1, 0]} />);

    const tiles = screen.getAllByTestId("tile");

    const tileContents = tiles
      .map((tile) => {
        const content =
          tile?.textContent || tile?.querySelector("*")?.textContent || "";
        return content;
      })
      .join("");

    expect(tileContents).toBe("hello");
  });

  test("show won game state", () => {
    const initialState = Array(2).fill("hello");
    useStore.getState().newGame(initialState);
    const answer = useStore.getState().answerWord;
    useStore.getState().addGuess(answer);

    render(<App />);

    // shows all guesses in the DOM
    expect(document.querySelector("main")?.textContent).toEqual(
      initialState.join("") + answer
    );
  });

  test("it can start a new game", () => {
    useStore.getState().newGame(["hello", "hello", "hello", "hello", "hello"]);
    render(<App />);

    // Use a custom query function to check for the presence of "Game over" text
    expect(screen.queryByText("Game over")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(72);
  });
});
