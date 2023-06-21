import { Example } from "./Example";

export type ExampleModel = {
  text: string;
  value: string;
  image?: string;
};

const EXAMPLES: ExampleModel[] = [
  {
    text: "What is the Porsche Home Mobile Charger Connect (AC) Energy Manager?",
    value:
      "What is the Porsche Home Mobile Charger Connect (AC) Energy Manager?",
    image:
      "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2019/products/taycan-world-premiere-18445/gallery-static/b-P19_0582_a3_rgb.jpg/jcr:content/b-P19_0582_a3_rgb.jpg",
  },
  {
    text: "How big is the luggage compartment of the Porsche Cayenne Turbo?",
    value: "How big is the luggage compartment of the Porsche Cayenne Turbo?",
    image:
      "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2021/Sports-Society/Sports/Paul-Casey-tests-Cayenne-Turbo-GT-Goodwood/G21_0117_fine.jpeg/jcr:content/G21_0117_fine.jpeg",
  },
  {
    text: "What are the differences of a Porsche Panamera 4S E-Hybrid and the BMW i7?",
    value:
      "What are the differences of a Porsche Panamera 4S E-Hybrid and the BMW i7?",
    image:
      "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/porsche_newsroom/Produkte/Panamera/Panamera-Inno-Drive/b-Porsche-Panamera-4S.jpg/jcr:content/b-Porsche-Panamera-4S.jpg",
  },
];

interface Props {
  onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
  return (
    <ul className="list-none my-5 px-0 flex flex-wrap md:flex-nowrap gap-5 flex-1 justify-center">
      {EXAMPLES.map((x, i) => (
        <li className="w-full" key={i}>
          <Example text={x.text} value={x.value} imgSrc={x.image} onClick={onExampleClicked} />
        </li>
      ))}
    </ul>
  );
};
