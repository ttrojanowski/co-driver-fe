import { PButtonPure, PIcon } from "@porsche-design-system/components-react";
import { FC, useState } from "react";
import {
  EmailShareButton,
} from "react-share";

interface Props {
    emailSubject?: string;
    body?: string;
  }
  

const ShareAnswerDropdown = ({emailSubject, body}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
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
        <div className="origin-top-right absolute right-0 p-2 mt-2 w-md rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <EmailShareButton
              subject={emailSubject}
              body={body}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              url="https://www.porsche.com"
            >
              <PIcon name="email" /> 
            </EmailShareButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareAnswerDropdown;
