import React from 'react';
import { act, render, screen } from "@testing-library/react";
import { Hero } from "../../../src/components/Hero/Hero";
import { describe, it } from 'vitest'
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";


describe("Hero component", () => {
  it("renders the long version of the hero", async ({ expect }) => {
    render(<PorscheDesignSystemProvider><Hero /></PorscheDesignSystemProvider>);
    const title = (await screen.findByTestId("title-tst"));
    const subtitle = (await screen.findByTestId("subtitle-tst"));
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("renders the short version of the hero", async ({ expect }) => {
    render(<PorscheDesignSystemProvider><Hero short={true}/></PorscheDesignSystemProvider>);
    const title = (await screen.findByTestId("titles-tst"));
    const subtitle = (await screen.findByTestId("subtitles-tst"));
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("not display the 'Get Started' modal when the button is not clicked", async ({ expect }) => {
    render(<PorscheDesignSystemProvider><Hero /></PorscheDesignSystemProvider>);
    const modal = await screen.findByTestId("gs-modal-test");
    expect(modal).property("open").equal(false);
  });

  it("displays the 'Get Started' modal when the button is clicked", async ({ expect }) => {
    render(<PorscheDesignSystemProvider><Hero /></PorscheDesignSystemProvider>);
    const button = (await screen.findByTestId("button-tst"));
    act(() => button.click());
    const modal = await screen.findByTestId("gs-modal-test");
    expect(modal).property("open").equal(true);
  });

});