import { Stack } from "@fluentui/react";
import { animated, useSpring } from "@react-spring/web";

import styles from "./Answer.module.css";
import { AnswerIcon } from "./AnswerIcon";
import { PSpinner } from "@porsche-design-system/components-react";

export const AnswerLoading = () => {
    return (
        <div>
            <Stack className={styles.answerContainer} verticalAlign="space-between">
                <AnswerIcon />
                <Stack.Item grow>
                    <p>Generating your answer...</p>
                    <PSpinner size={{ base: 'small', l: 'medium' }} aria={{ 'aria-label': 'Generating your answer' }} />
                </Stack.Item>   
            </Stack>
        </div>
    );
};
