import { describe, expect, test } from "vitest";
import App from "./App";
import { useStore } from "./utilities/store";
import { render, screen, userEvent } from "./test/test-utils";

describe("App", () => {
  test("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Wordle Adventure/i)).toBeInTheDocument();
  });

  test("it shows empty state", () => {
    useStore.setState({ guessRows: [] });
    render(<App />);
    expect(screen.queryByText("Game over")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(72);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });

  test("it shows one row of guesses", () => {
    useStore.setState({
      guessRows: [{ guess: "hello" }],
    });
    render(<App />);
    expect(screen.queryByText("Game over")).toBeNull();
    expect(document.querySelector("main")?.textContent).toEqual("hello");
  });

  test("it shows game over state", () => {
    useStore.setState({
      guessRows: [
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
      ],
      answerWord: "close", //  When I use 'hello' keeps on passing the test, and it shouldn't
    });
    render(<App />);

    // Use a custom query function to check for the presence of "Game over" text
    const gameOverText = document.querySelector("[role=modal] p");
    expect(gameOverText?.textContent).toContain("Game over");
  });

  test("it can start a new game", () => {
    useStore.setState({
      guessRows: [
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
        { guess: "hello" },
      ],
      answerWord: "close", //  When I use 'hello' keeps on passing the test, and it shouldn't
    });
    render(<App />);

    // Use a custom query function to check for the presence of "Game over" text
    const gameOverText = document.querySelector("[role=modal] p");
    expect(gameOverText?.textContent).toContain("Game over");
    userEvent.click(screen.getByText("New Game"));
    expect(screen.queryByText("Game over")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(72);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });
});
