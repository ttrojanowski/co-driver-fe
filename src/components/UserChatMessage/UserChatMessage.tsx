import { PDivider } from "@porsche-design-system/components-react";
import avatar from "../../assets/avatar2.png";

interface Props {
  message: string;
  className?: string;
}

export const UserChatMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-end mb-5 max-w-[80%] ml-auto">
      <div
        className="
        bg-white
        text-black text-sm mb-5
        cursor-default 
        max-w-xl
        min-w-[200px]
        p-4 font-medium 
        rounded-lg shadow-md
        border-r-8 border-amber-400
      "
      >
        <div className="pb-2">
          <div className="flex gap-x-2 items-center">
            <div className="flex-1">
              <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            </div>
            <p className="font-semibold flex items-center justify-center uppercase">
              John Doe
            </p>
            <div className="flex-1"></div>
          </div>
        </div>
        <PDivider direction="horizontal" color="contrast-high" />
        <div className="py-4 text-sm md:text-lg overflow-y-auto">
          "{message}"
        </div>
      </div>
    </div>
  );
};
