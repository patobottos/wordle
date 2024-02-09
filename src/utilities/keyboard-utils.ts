export const handleKeyPress = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  onClickProps: (key: string) => void
) => {
  // Ensure that e.currentTarget is defined
  if (e.currentTarget) {
    const { textContent, innerHTML } = e.currentTarget;

    let returnProps = textContent!;
    if (textContent !== innerHTML) {
      returnProps = "Backspace";
    }

    onClickProps(returnProps);

  }
};