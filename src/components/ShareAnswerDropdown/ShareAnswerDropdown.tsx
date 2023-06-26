import { PButtonPure, PIcon } from "@porsche-design-system/components-react";
import { useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import extractEmailData from "./EmailExtractor";

interface Props {
  answer?: string;
}

const ShareAnswerDropdown = ({ answer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { subject: emailSubject, body } = extractEmailData(answer, "Answer");

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
        <div className="origin-top-right absolute right-0 p-1 mt-1 w-md rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
              url=""
            >
              <PIcon name="email" />
            </EmailShareButton>
            <FacebookShareButton
              disabled
              quote={body}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              url="http://porsche.com"
            >
              <PIcon name="logo-facebook" />
            </FacebookShareButton>
            <TwitterShareButton
              disabled
              title={emailSubject}
              via={body}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              url="http://porsche.com"
            >
              <PIcon name="logo-twitter" />
            </TwitterShareButton>
            <LinkedinShareButton
              disabled
              title={emailSubject}
              summary={body}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              url="http://porsche.com"
            >
              <PIcon name="logo-linkedin" />
            </LinkedinShareButton>
            <WhatsappShareButton
              disabled
              title={emailSubject}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              url="http://porsche.com"
            >
              <PIcon name="logo-whatsapp" />
            </WhatsappShareButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareAnswerDropdown;
