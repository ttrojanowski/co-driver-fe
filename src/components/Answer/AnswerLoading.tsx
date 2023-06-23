
import { PDivider, PSpinner } from "@porsche-design-system/components-react";
import logo from "../../assets/co-driver-logo.png";

interface Props {
  fullWidth?: boolean;
}

export const AnswerLoading = ({ fullWidth }: Props) => {
  return (
    <div
      className={`${
        fullWidth ? "w-full max-w-screen-lg p-3 md:p-10" : "max-w-[80%] md:max-w-2xl min-w-[50%]"
      }`}
    >
      <div
        className="bg-white
        text-black text-sm mb-4 
        cursor-default
        w-full
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
    </div>
  );
};
