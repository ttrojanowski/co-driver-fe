import { PButtonTile } from "@porsche-design-system/components-react";
import hero from "../../assets/hero.jpg";

interface Props {
  text: string;
  value: string;
  imgSrc?: string;
  onClick: (value: string) => void;
}

export const Example = ({ text, value, imgSrc, onClick }: Props) => {
  return (
    <PButtonTile
      label={"L"}
      description={text}
      className="min-w-[300px]"
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
