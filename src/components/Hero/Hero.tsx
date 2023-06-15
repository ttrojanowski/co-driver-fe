import { PButton } from "@porsche-design-system/components-react";
import hero from "../../assets/hero.jpg";

interface Props {
  className?: string;
}

export const Hero = ({ className }: Props) => {
  return (
    <div className={className}>
      <section className="bg-gradient-to-r from-gray-800 via-hero to-black">
        <div className="grid max-w-screen-xl mx-auto p-4 lg:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="mr-auto place-self-center my-8 lg:my-16 lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-white">
              Introducing Porsche Co-Drivers
            </h1>
            <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl">
              Revolutionizing the Ride: Unleash the Power of Co-Driver (AI) in
              your Porsche Experience!
            </p>
            <PButton
              className="border border-white"
              variant="primary"
              hideLabel={{ base: true, s: false }}
              icon="arrow-right"
            >
              Get Started
            </PButton>
          </div>
          <div className="hidden lg:block m-0 lg:col-span-5">
            <img src={hero} className="object-cover h-full"/>
          </div>
        </div>
      </section>
    </div>
  );
};
