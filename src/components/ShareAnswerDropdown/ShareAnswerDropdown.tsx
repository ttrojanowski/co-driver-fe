import {
  PButtonPure,
  PIcon,
  PToast,
  useToastManager,
} from "@porsche-design-system/components-react";
import { useCallback, useState, useRef, useEffect } from "react";
import { EmailShareButton } from "react-share";
import extractEmailData from "./EmailExtractor";

interface Props {
  answer?: string;
}

const ShareAnswerDropdown = ({ answer }: Props) => {
  const { addMessage } = useToastManager();
  const [isOpen, setIsOpen] = useState(false);
  const { subject: emailSubject, body } = extractEmailData(answer);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const copyOnClick = useCallback(() => {
    navigator.clipboard.writeText(answer ?? "");
    setIsOpen(false);
    addMessage({ text: "Copied to clipboard", state: "success" });
  }, [answer]);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <div>
        <PButtonPure
          icon="share"
          aria-haspopup="true"
          aria-expanded="true"
          hideLabel={true}
          onClick={() => setIsOpen(!isOpen)}
        >
          Share
        </PButtonPure>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 p-1 mt-1 w-md rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="block text-sm text-gray-700 cursor-pointer">
              <PIcon
                name="copy"
                className="hover:bg-slate-100"
                aria-disabled
                aria-placeholder="Copy"
                onClick={copyOnClick}
              ></PIcon>
            </div>
            <EmailShareButton
              subject={emailSubject}
              body={body}
              className="block text-sm text-gray-700"
              role="menuitem"
              url=""
            >
              <PIcon name="email" className="hover:bg-slate-100"/>
            </EmailShareButton>

            <PIcon name="chat" aria-disabled aria-placeholder="MS Teams" />
          </div>
        </div>
      )}
      <PToast />
    </div>
  );
};

export default ShareAnswerDropdown;
