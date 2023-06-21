import { PDivider } from "@porsche-design-system/components-react";
import avatar from "../../assets/avatar2.png";

interface Props {
  message: string;
  className?: string;
}

export const UserChatMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-end min-w-[300px]">
      <div
        className="
        bg-white
        text-black text-sm mb-5
        cursor-default
        p-4 font-medium 
        w-[90%]
        md:max-w-2xl
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
