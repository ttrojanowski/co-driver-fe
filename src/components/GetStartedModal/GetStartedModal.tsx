import { PModal } from "@porsche-design-system/components-react";


interface Props {
    isModalOpen: boolean;
    onDismiss: () => void;
  }
  
  export const GetStartedModal = ({ isModalOpen, onDismiss }: Props) => {
    return (
        <PModal
        heading="Get Started with Porsche Co-Driver!"
        open={isModalOpen}
        onDismiss={onDismiss}
        data-testid="gs-modal-test"
      >
        <br />
        <p>Welcome to Porsche Co-Driver!</p>
        <br />
        <p>
          This intelligent virtual assistant is specifically designed to provide
          accurate and reliable information based on our company's wealth of
          knowledge. With controlled access to relevant sources, it offers a
          trustworthy resource to help you find answers to your questions and
          generate valuable insights.
        </p>
        <br></br>
        <p>
          <b>1. Reliable Source of Information:</b> Our Co-Driver taps into our
          organization's data, ensuring that the information it provides is
          accurate, up-to-date, and aligned with our company's expertise.
        </p>
        <p>
          <b>2. Tailored Responses and Recommendations:</b> The Co-Driver
          understands the context of your queries and provides tailored
          responses and recommendations. It analyzes the information at hand,
          identifies patterns, and offers relevant insights that can drive
          decision-making and problem-solving within our corporate environment.
        </p>
        <p>
          <b>3. Efficient Linking to Relevant Sources:</b> Not only does our
          Co-Driver provide answers, but it also links you directly to the
          relevant sources. This ensures that you have access to the supporting
          documents, research papers, or internal references that validate the
          information shared.
        </p>
        <br />
        <p>
          Porsche Co-Driver empowers you to explore further and dive deeper into
          the subject matter whenever necessary and helps you to efficiently
          find answers to your questions.
        </p>
        <br />
      </PModal>
    );
  };