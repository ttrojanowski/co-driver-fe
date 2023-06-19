import { PButtonPure } from "@porsche-design-system/components-react";

interface Props {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ClearChatButton = ({ className, disabled, onClick }: Props) => {
  return (
    <PButtonPure
      className={`${className ?? ""}`}
      onClick={onClick}
      icon="delete"
      theme="dark"
      hideLabel={false}
      disabled={disabled}
    >
      Clear chat
    </PButtonPure>
  );
};
