import { parseSupportingContentItem } from "./SupportingContentParser";

import styles from "./SupportingContent.module.css";

interface Props {
  supportingContent: string[];
}

export const SupportingContent = ({ supportingContent }: Props) => {
  return (
    <ul className="list-none flex flex-col gap-3 py-3">
      {supportingContent.map((x, i) => {
        const parsed = parseSupportingContentItem(x);

        return (
          <li key={i} className="break-words rounded-lg shadow-sm outline-1 outline bg-white outline-transparent flex flex-col p-5">
            <h4 className="m-0">{parsed.title}</h4>
            <p className="mb-0 font-medium">{parsed.content}</p>
          </li>
        );
      })}
    </ul>
  );
};
