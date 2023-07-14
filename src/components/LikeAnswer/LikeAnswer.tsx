import { useCallback, useState } from "react";
import FeedbackModal from "./FeedbackModal";
import { PToast, useToastManager } from "@porsche-design-system/components-react";

const LikeAnswer = () => {
  const [action, setAction] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { addMessage } = useToastManager();

  const onShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onDismiss = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleLike = () => {
    setAction(action === 1 ? 0 : 1);
  };

  const handleDislike = () => {
    setAction(action === -1 ? -1 : -1);
    onShowModal();
  };

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true);
    addMessage({ text: "Feedback submitted", state: "success" });
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <button data-testid="like-btn-tst" onClick={handleLike} className="flex items-center space-x-2 disabled:pointer-events-none" disabled={feedbackSubmitted}>
        <svg
          className={`w-6 h-6 hover:scale-125 ${
            action === 1 ? "text-green-500" : "text-gray-500"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button data-testid="dislike-btn-tst" onClick={handleDislike} className="flex items-center space-x-2 disabled:pointer-events-none" disabled={feedbackSubmitted}>
        <svg
          className={`w-6 h-6 rotate-180 hover:scale-125 ${
            action === -1 ? "text-red-500" : "text-gray-500"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <FeedbackModal isModalOpen={showModal} onDismiss={onDismiss} onFeedbackSubmit={handleFeedbackSubmit}/>
      <PToast />
    </div>
  );
};

export default LikeAnswer;
