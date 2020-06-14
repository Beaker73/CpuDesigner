import React, { useMemo, Ref } from "react";
import { Stack, getTheme, mergeStyleSets, getParent } from "@fluentui/react";

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
        {/* 
            No margin at righ scroll side
            https://stackoverflow.com/questions/11695354/css-right-margin-does-not-work-inside-a-div-with-overflow-scroll 
        */}
        <div className={style.rightMargin} ></div>
    </Stack>;

    function useStyle() {
        return mergeStyleSets({
            bladeList: {
                boxSizing: "border-box",
                overflowY: "hidden",
                overflowX: "scroll",
                padding: theme.spacing.m,
            },
            rightMargin: {
                width: 1,
                minWidth: 1,
                maxWidth: 1,
                background: "transparent",
            },
        })
    }
}

