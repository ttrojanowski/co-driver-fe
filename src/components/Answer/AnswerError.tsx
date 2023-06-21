import { Stack, PrimaryButton } from "@fluentui/react";
import { ErrorCircle24Regular } from "@fluentui/react-icons";

import styles from "./Answer.module.css";
import logo from "../../assets/co-driver-logo.png";
import {
  PButton,
  PButtonPure,
  PDivider,
  PIcon,
} from "@porsche-design-system/components-react";

interface Props {
  error: string;
  onRetry: () => void;
}

export const AnswerError = ({ error, onRetry }: Props) => {
  return (
    <div
      className="bg-white
          text-black text-sm mb-4 
          cursor-default 
          max-w-sm md:max-w-xl
          p-4 font-medium
          rounded-lg shadow-md
        border-l-8 border-red-600"
    >
      <div className="pb-2">
        <div className="flex gap-x-2 items-center">
          <div className="flex-1">
            <PIcon color="notification-error" name="error-filled" />
          </div>
          <p className="font-semibold flex items-center justify-center uppercase">
            Porsche Co-Driver
          </p>
          <div className="flex-1"></div>
        </div>
      </div>
      <PDivider direction="horizontal" color="contrast-high" />
      <div className="py-4 text-sm md:text-lg overflow-y-auto flex items-center flex-col justify-center">
        <p>{error}</p>
        <PButton
          onClick={onRetry}
          icon="error-filled"
          variant="secondary"
          className="mt-4"
        >
          Retry
        </PButton>
      </div>
    </div>
  );
};
