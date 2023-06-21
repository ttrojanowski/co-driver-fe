import { Pivot, PivotItem } from "@fluentui/react";
import DOMPurify from "dompurify";

import styles from "./AnalysisPanel.module.css";

import { SupportingContent } from "../SupportingContent";
import { AskResponse } from "../../api";
import { AnalysisPanelTabs } from "./AnalysisPanelTabs";

interface Props {
  activeTab: AnalysisPanelTabs;
  onActiveTabChanged: (tab: AnalysisPanelTabs) => void;
  activeCitation: string | undefined;
  citationHeight: string;
  answer: AskResponse;
}

const pivotItemDisabledStyle = { disabled: true, style: { color: "grey" } };

export const AnalysisPanel = ({
  answer,
  activeTab,
  activeCitation,
  citationHeight,
  onActiveTabChanged,
}: Props) => {
  const isDisabledThoughtProcessTab: boolean = !answer.thoughts;
  const isDisabledSupportingContentTab: boolean = !answer.data_points.length;
  const isDisabledCitationTab: boolean = !activeCitation;

  const sanitizedThoughts = DOMPurify.sanitize(answer.thoughts!);

  return (
    <Pivot
      className="flex-1 overflow-y-auto px-5 pt-3 bg-gray-200"
      selectedKey={activeTab}
      styles={{ root: { fontFamily: "inherit" }, link: { fontFamily: "inherit" } }}
      onLinkClick={(pivotItem) =>
        pivotItem &&
        onActiveTabChanged(pivotItem.props.itemKey! as AnalysisPanelTabs)
      }
    >
      <PivotItem
        itemKey={AnalysisPanelTabs.ThoughtProcessTab}
        headerText="Thought process"
        headerButtonProps={
          isDisabledThoughtProcessTab ? pivotItemDisabledStyle : undefined
        }
      >
        <div
          className="break-words py-4 px-5"
          dangerouslySetInnerHTML={{ __html: sanitizedThoughts }}
        ></div>
      </PivotItem>
      <PivotItem
        itemKey={AnalysisPanelTabs.SupportingContentTab}
        headerText="Supporting content"
        headerButtonProps={
          isDisabledSupportingContentTab ? pivotItemDisabledStyle : undefined
        }
      >
        <SupportingContent supportingContent={answer.data_points} />
      </PivotItem>
      <PivotItem
        itemKey={AnalysisPanelTabs.CitationTab}
        headerText="Citation"
        headerButtonProps={
          isDisabledCitationTab ? pivotItemDisabledStyle : undefined
        }
      >
        <iframe
          title="Citation"
          src={activeCitation}
          width="100%"
          height={citationHeight}
        />
      </PivotItem>
    </Pivot>
  );
};
