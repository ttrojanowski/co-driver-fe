import { PButton } from "@porsche-design-system/components-react";

interface Props {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ClearChatButton = ({ className, disabled, onClick }: Props) => {
  return (
    <PButton
      className={`${className ?? ""}`}
      onClick={onClick}
      icon="delete"
      hideLabel={false}
      disabled={disabled}
    >
      Clear chat
    </PButton>
  );
};
