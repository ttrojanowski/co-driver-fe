import styles from "./Example.module.css";
import { motion } from "framer-motion";

interface Props {
  text: string;
  value: string;
  onClick: (value: string) => void;
}

export const Example = ({ text, value, onClick }: Props) => {
  return (
    <motion.div
      className="
      bg-gradient-to-rb from-gray-900 to-gray-600 bg-gradient-to-r
      text-white
      italic rounded-lg flex flex-col text-center
       p-5 mb-5 cursor-pointer
       opacity-80 
       hover:opacity-100
       hover:font-semibold"
      whileHover={{
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        boxShadow: "0px 0px 8px rgb(12, 14, 20)",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(value)}
    >
      <p className={styles.exampleText}>{text}</p>
    </motion.div>
  );
};
