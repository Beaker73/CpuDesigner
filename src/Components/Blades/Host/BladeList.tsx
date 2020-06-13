import React, { useMemo } from "react";
import { Stack, getTheme, mergeStyleSets } from "@fluentui/react";

export interface BladeListProps extends React.HTMLAttributes<HTMLDivElement> {
}

/**
* a BladeList is the container that holds all the blades on screen
*/
export function BladeList(props: React.PropsWithChildren<BladeListProps>): JSX.Element {

const theme = getTheme();
const style = useMemo(useStyle, [theme]);

return <Stack horizontal tokens={{ childrenGap: theme.spacing.m }} className={[props.className, style.bladeList].join(" ")}>
    {props.children}
</Stack>;

function useStyle() {
    return mergeStyleSets({
        bladeList: {
            boxSizing: "border-box",
            overflowY: "hidden",
            overflowX: "scroll",
            padding: theme.spacing.m,
        },
    })
}
}

