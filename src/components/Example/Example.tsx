import { PButtonTile } from "@porsche-design-system/components-react";
import styles from "./Example.module.css";
import { motion } from "framer-motion";
import hero from "../../assets/hero.jpg";

interface Props {
  text: string;
  value: string;
  imgSrc?: string;
  onClick: (value: string) => void;
}

export const Example = ({ text, value, imgSrc, onClick }: Props) => {
  return (
    // <motion.div
    //   className="
    //   bg-gradient-to-rb from-gray-900 to-gray-600 bg-gradient-to-r
    //   text-white
    //   text-sm md:text-lg
    //   italic rounded-lg flex flex-col text-center
    //   p-2 md:p-5 cursor-pointer
    //   opacity-80
    //   hover:opacity-100
    //   hover:font-semibold"
    //   whileHover={{
    //     scale: 1.1,
    //     textShadow: "0px 0px 8px rgb(255, 255, 255)",
    //     boxShadow: "0px 0px 8px rgb(12, 14, 20)",
    //   }}
    //   whileTap={{ scale: 0.9 }}
    //   onClick={() => onClick(value)}
    // >
    //   <p className={styles.exampleText}>{text}</p>
    // </motion.div>
    <PButtonTile
      label={"L"}
      description={text}
      className="min-w-sm w-[360px]"
      compact={true}
      gradient={true}
      onClick={() => onClick(value)}
    >
      <picture>
        <img src={imgSrc? imgSrc : hero} alt="Some alt text" />
      </picture>
    </PButtonTile>
  );
};
