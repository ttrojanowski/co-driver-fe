import { Stack } from "@fluentui/react";
import { animated, useSpring } from "@react-spring/web";

import styles from "./Answer.module.css";
import { AnswerIcon } from "./AnswerIcon";
import { PDivider, PSpinner } from "@porsche-design-system/components-react";
import logo from "../../assets/co-driver-logo.png";

export const AnswerLoading = () => {
  return (
    <div
      className="bg-white
        text-black text-sm mb-4 
        cursor-default 
        max-w-sm md:max-w-xl
        p-4 font-medium
        rounded-lg shadow-md
        border-l-8 border-lime-300"
    >
      <div className="pb-2">
        <div className="flex gap-x-2 items-center">
          <div className="flex-1">
            <img src={logo} alt="avatar" className="w-8 h-8 rounded-full" />
          </div>
          <p className="font-semibold flex items-center justify-center uppercase">
            Porsche Co-Driver
          </p>
          <div className="flex-1"></div>
        </div>
      </div>
      <PDivider direction="horizontal" color="contrast-high" />
      <div className="py-4 text-sm md:text-lg overflow-y-auto flex items-center flex-col justify-center">
        <p>Generating your answer...</p>
        <PSpinner
          size={{ base: "small", l: "medium" }}
          aria={{ "aria-label": "Generating your answer" }}
        />
      </div>
    </div>
  );
};
