import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LikeAnswer from "../../../src/components/LikeAnswer/LikeAnswer";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";
import { beforeEach, it, describe, vi } from "vitest";

vi.mock("@porsche-design-system/components-react", async () => {
  const actual = await vi.importActual(
    "@porsche-design-system/components-react"
  );
  return {
    ...actual,
    useToastManager: vi.fn().mockReturnValue({ addMessage: vi.fn() }),
  };
});

describe("LikeAnswer", () => {
  beforeEach(() => {
    render(
      <PorscheDesignSystemProvider>
        <LikeAnswer />
      </PorscheDesignSystemProvider>
    );
  });

  it("should click Like button", () => {
    const likeButton = screen.getByTestId("like-btn-tst");
    fireEvent.click(likeButton);
  });

  it("should open modal when Dislike button clicked", async () => {
    const dislikeButton = screen.getByTestId("dislike-btn-tst");
    fireEvent.click(dislikeButton);
    expect(screen.getByTestId("feedback-modal-tst")).toHaveProperty(
      "open",
      true
    );
  });

  it("should disable buttons after feedback", async () => {
    const likeButton = screen.getByTestId("like-btn-tst");
    const dislikeButton = screen.getByTestId("dislike-btn-tst");

    fireEvent.click(dislikeButton);
    const feedbackInput = screen.getByTestId("feedback-input-tst");
    fireEvent.change(feedbackInput, { target: { value: "test feedback" } });
    const submitButton = screen.getByText("Send");
    fireEvent.click(submitButton);

    expect(dislikeButton).toHaveProperty("disabled", true);
    expect(likeButton).toHaveProperty("disabled", true);
  });

  it("should not disable buttons after feedback cancel", async () => {
    const likeButton = screen.getByTestId("like-btn-tst");
    const dislikeButton = screen.getByTestId("dislike-btn-tst");

    fireEvent.click(dislikeButton);
    const feedbackInput = screen.getByTestId("feedback-input-tst");
    fireEvent.change(feedbackInput, { target: { value: "test feedback" } });
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(dislikeButton).toHaveProperty("disabled", false);
    expect(likeButton).toHaveProperty("disabled", false);
  });
});
