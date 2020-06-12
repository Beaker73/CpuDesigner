import * as React from "react";
import { useMemo } from "react";
import { mergeStyleSets, getTheme, Stack, Text, IconButton, FocusZone } from "@fluentui/react";

export interface BladeListProps
    extends React.HTMLAttributes<HTMLDivElement> {
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

export interface BladeProps {
    size?: number;
    title?: string;
}

export function Blade(props: React.PropsWithChildren<BladeProps>): JSX.Element {

    const theme = getTheme();
    const style = useMemo(useStyle, [theme]);
    const width = (props.size ?? 5) * 100;

    return <div className={style.blade} style={{ width: width, minWidth: width, maxWidth: width }}>
        <FocusZone>
            <Stack className={style.bladeContainer}>
                <Stack.Item grow={0}>
                    <Stack horizontal>
                        <Stack.Item grow={1} className={style.bladeTitle}>
                            <Text variant="xLargePlus">
                                {props.title ?? "FooBar"}
                            </Text>
                        </Stack.Item>
                        <Stack.Item grow={0}>
                            <IconButton iconProps={{ iconName: "ChromeClose" }} />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item grow={1}>
                    {props.children}
                </Stack.Item>
            </Stack>
        </FocusZone>
    </div>

    function useStyle() {
        return mergeStyleSets({
            blade: {
                boxSizing: "border-box",
                height: "100%",
                boxShadow: theme.effects.elevation64,
                border: `solid 1px ${theme.semanticColors.bodyFrameDivider}`,
                padding: theme.spacing.m,
            },
            bladeContainer: {
                height: "100%",
            },
            bladeTitle: {
                marginBottom: theme.spacing.l1,
            },
        })
    }
}