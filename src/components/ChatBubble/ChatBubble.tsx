import styles from "./ChatBubble.module.scss";
import avatar from "../../assets/avatar2.png";
import logo from "../../assets/co-driver-logo.png";
import { PButtonPure, PDivider } from "@porsche-design-system/components-react";

interface Props {
  className?: string;
  border?: string;
}

export const ChatBubble = ({ className, border }: Props) => {
  return (
    <div className={className}>
      <div
        className={`"
        bg-gray-200
      text-black text-sm mb-20 
      cursor-default 
      max-w-xl
      p-4 font-medium
      rounded-lg shadow-xl
    " ${border}`}
      >
        <div className="pb-2">
          <div className="flex items-center justify-between gap-4">
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            <p className="font-semibold uppercase">John Doe</p>
            <div className="">
              <PButtonPure
                icon="light"
                size="small"
                placeholder="Show tought process"
              ></PButtonPure>
              <PButtonPure
                icon="list"
                size="small"
                placeholder="Show supporting content"
              ></PButtonPure>
            </div>
          </div>
        </div>
        <PDivider direction="horizontal" color="contrast-high" />
        <div className="py-3 overflow-y-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          pulvinar eleifend lectus eu lobortis. Donec fermentum, tellus quis
          luctus euismod, metus erat suscipit ante, et mollis massa mi at ex.
          Aenean fermentum ornare orci id fermentum. Ut aliquet maximus purus.
          Suspendisse vel dui sit amet turpis commodo consectetur suscipit vel
          libero. Suspendisse potenti. Morbi quis nunc metus. Praesent vitae
          mattis enim. Donec volutpat nisl ac orci luctus iaculis. In hac
          habitasse platea dictumst. Donec et dapibus neque.
        </div>
        <div className="font-semibold">
          Citations:{" "}
          <span className="text-purple-800 font-semibold hover:font-bold p-1">
            1. Some Citation
          </span>
        </div>
      </div>
    </div>
  );
};
