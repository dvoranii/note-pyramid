import { Button } from "./GenerateButton.styled";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const GenerateButton = ({ onClick, disabled }: GenerateButtonProps) => {
  return (
    <Button onClick={onClick} disabled={disabled} $disabled={disabled}>
      GENERATE
    </Button>
  );
};

export default GenerateButton;
