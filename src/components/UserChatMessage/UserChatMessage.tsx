import avatar from "../../assets/avatar2.png";
import logo from "../../assets/co-driver-logo.png";
import { PButtonPure, PDivider } from "@porsche-design-system/components-react";

interface Props {
  message: string;
  className?: string;
}

export const UserChatMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-end mb-5 max-w-[80%] ml-auto">
      <div
        className="
          bg-gray-200
        text-black text-sm mb-20 
        cursor-default 
        max-w-xl
        p-4 font-medium
        rounded-lg shadow-xl
        border-r-8 border-indigo-400
      "
      >
        <div className="pb-2">
          <div className="flex items-center justify-start gap-x-2">
            <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <p className="font-semibold uppercase">John Doe</p>
          </div>
        </div>
        <PDivider direction="horizontal" color="contrast-high" />
        <div className="py-4 text-sm md:text-lg overflow-y-auto">"{message}"</div>
      </div>
    </div>

    // <div className={styles.container}>
    //     <div className={styles.message}>{message}</div>
    // </div>
  );
};
