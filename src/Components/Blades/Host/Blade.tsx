import React, { useContext, useMemo } from "react";
import { FocusZone, Stack, Text, IconButton, getTheme, mergeStyleSets, mergeStyles, AnimationStyles } from "@fluentui/react";

import { bladeContext } from "./BladeContext";

export interface BladeProps {
    size?: number;
    title?: string;
}

export function Blade(props: React.PropsWithChildren<BladeProps>): JSX.Element {

    const context = useContext(bladeContext);
    const bladeId = context.bladeId!;
    const theme = getTheme();
    const style = useMemo(useStyle, [theme, bladeId]);
    const width = (props.size ?? 5) * 100;

    return <div className={style.blade} style={{ width: width, minWidth: width, maxWidth: width }}>
        <bladeContext.Provider value={{ ...context, bladeProps: props }}>
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
                                {bladeId === 0 ?
                                    void 0 :
                                    <IconButton iconProps={{ iconName: "ChromeClose" }} onClick={closeBlade} />
                                }
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>
                    <Stack.Item grow={1}>
                        {props.children}
                    </Stack.Item>
                </Stack>
            </FocusZone>
        </bladeContext.Provider>
    </div>

    function closeBlade(): void {
        if (context.closeBlade !== void 0 && context.bladeId !== void 0) {
            context.closeBlade(context.bladeId);
        }
    }

    function useStyle() {
        return mergeStyleSets({
            blade: mergeStyles(
                {
                    boxSizing: "border-box",
                    height: "100%",
                    boxShadow: theme.effects.elevation16,
                    border: `solid 1px ${theme.semanticColors.bodyFrameDivider}`,
                    background: theme.semanticColors.bodyBackground,
                    padding: theme.spacing.m,
                    zIndex: bladeId * 100,
                },
                AnimationStyles.slideLeftIn400,
                //AnimationStyles.fadeOut400,
            ),
            bladeContainer: {
                height: "100%",
            },
            bladeTitle: {
                marginBottom: theme.spacing.l1,
            },
        })
    }
}
