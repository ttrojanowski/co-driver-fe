import {
  PButton,
  PButtonGroup,
  PModal,
  PText,
  PTextareaWrapper
} from "@porsche-design-system/components-react";
import React, { useState } from "react";

interface Props {
  isModalOpen: boolean;
  onDismiss: () => void;
  onFeedbackSubmit: () => void;
}

const FeedbackModal = ({ isModalOpen, onDismiss, onFeedbackSubmit }: Props) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    onFeedbackSubmit();
    onDismiss();
  };

  return (
    <PModal
      heading="Please provide feedback"
      open={isModalOpen}
      onDismiss={onDismiss}
      data-testid="feedback-modal-tst"
    >
      <PText className="pt-2 pb-4">
        We can see that you don't like the answer. Please provide some feedback
        to help us improve.
      </PText>
      <PTextareaWrapper label="Feedback" hideLabel={false} className="mb-6">
        <textarea
          name="feedback"
          data-testid="feedback-input-tst"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </PTextareaWrapper>
      <PButtonGroup>
        <PButton
          type="button"
          onClick={handleFeedbackSubmit}
          disabled={!feedback}
        >
          Send
        </PButton>
        <PButton
          type="button"
          variant="tertiary"
          icon="close"
          onClick={onDismiss}
        >
          Close
        </PButton>
      </PButtonGroup>
    </PModal>
  );
};

export default FeedbackModal;
