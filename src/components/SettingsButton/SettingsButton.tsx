import { Text } from "@fluentui/react";
import { Settings24Regular } from "@fluentui/react-icons";

import styles from "./SettingsButton.module.css";
import { PButton } from "@porsche-design-system/components-react";

interface Props {
  className?: string;
  onClick: () => void;
}

export const SettingsButton = ({ className, onClick }: Props) => {
  return (
    <PButton
      className={`${className ?? ""}`}
      onClick={onClick}
      icon="wrenches"
      hideLabel={false}
    >
      Developer Settings
    </PButton>
  );
};
