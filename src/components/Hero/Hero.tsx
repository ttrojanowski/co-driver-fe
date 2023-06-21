import {
  PButton,
  PButtonGroup,
  PModal,
  PText,
} from "@porsche-design-system/components-react";
import hero from "../../assets/hero.jpg";
import { useCallback, useState } from "react";
import { delay, motion } from "framer-motion";
import { GetStartedModal } from "../GetStartedModal/GetStartedModal";

interface Props {
  className?: string;
  short?: boolean;
}

const longHero = ({ className }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        staggerChildren: 0.05,
      },
    },
  };

  const secondSentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 2,
      },
    },
  };

  const animate = (title: string) => {
    const letter = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.1,
        },
      },
    };

    return title.split("").map((char, index) => (
      <motion.span key={char + "-" + index} variants={letter}>
        {char}
      </motion.span>
    ));
  };

  return (
    <>
      <div className={className}>
        <section className="bg-gradient-to-r from-gray-800 via-hero to-black">
          <div className="grid max-w-screen-xl mx-auto p-4 lg:gap-8 xl:gap-0 lg:grid-cols-12">
            <div className="mr-auto place-self-center my-8 lg:my-16 lg:col-span-7">
              <motion.div
                className="text-xl text-white mb-5 lg:mb-10 lg:text-4xl font-semibold"
                variants={sentence}
                initial="hidden"
                animate="visible"
              >
                {animate("Hi there 👋 I'm your Porsche Co-Driver.")}
              </motion.div>
              <motion.p
                className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl"
                variants={secondSentence}
                animate="visible"
                initial="hidden"
              >
                {animate(
                  "Your Trusted Source for Answers and Insights into the Porsche Knowledge Hub"
                )}
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  rotate: [-10, 10, -10, 10, -10, 0],
                  transition: { duration: 2.5, delay: 3.5 },
                }}
                whileHover={{ scale: 1.1 }}
                exit={{ opacity: 0 }}
              >
              <PButton
                className="border border-white"
                variant="primary"
                hideLabel={{ base: true, s: false }}
                icon="arrow-right"
                onClick={onOpen}
              >
                Get Started
              </PButton>
              </motion.button>
            </div>
            <div className="hidden lg:block m-0 lg:col-span-5">
              <img src={hero} className="object-cover h-full" />
            </div>
          </div>
        </section>
      </div>
      <GetStartedModal isModalOpen={isModalOpen} onDismiss={onDismiss} />
    </>
  );
};

const shortHero = ({ className }: Props) => (
  <div className={className}>
    <section className="bg-gradient-to-r from-gray-800 via-hero to-black">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="mr-auto place-self-center my-4 lg:my-8">
          <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-white flex items-center justify-center">
            Porsche Co-Driver
          </h1>
        </div>
      </div>
    </section>
  </div>
);

export const Hero = ({ className, short }: Props) => {
  return (
    (short && shortHero({ className })) || (!short && longHero({ className }))
  );
};
