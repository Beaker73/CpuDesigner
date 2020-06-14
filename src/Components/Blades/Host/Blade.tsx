import React, { useContext, useMemo } from "react";
import { FocusZone, Stack, Text, getTheme, mergeStyleSets, mergeStyles, AnimationStyles, CommandBar, ICommandBarProps, ICommandBarItemProps, ContextualMenuItemType } from "@fluentui/react";

import { bladeContext } from "./BladeContext";

export interface BladeProps {
    size?: number;
    title?: string;
    buttons?: ICommandBarItemProps[];
}

export function Blade(props: React.PropsWithChildren<BladeProps>): JSX.Element {

    const context = useContext(bladeContext);
    const bladeId = context.bladeId!;
    const theme = getTheme();
    const style = useMemo(useStyle, [theme, bladeId]);
    const width = (props.size ?? 5) * 100;

    const items: ICommandBarItemProps[] = [];

    if (props.title)
        items.push({ key: "title", onRender: renderTitle, itemType: ContextualMenuItemType.Header, props });

    const farItems: ICommandBarItemProps[] = props.buttons ? [...props?.buttons] : [];
    if (bladeId > 0)
        farItems.push({ key: "close", iconOnly: true, onClick: closeBlade, iconProps: { iconName: "ChromeClose" } });

    return <div className={style.blade} style={{ width: width, minWidth: width, maxWidth: width }}>
        <bladeContext.Provider value={{ ...context, bladeProps: props }}>
            <FocusZone>
                <Stack className={style.bladeContainer}>
                    <Stack.Item grow={0}>
                        <CommandBar styles={{ root: { padding: 0 } }} items={items} farItems={farItems} />
                    </Stack.Item>
                    <Stack.Item grow={1}>
                        {props.children}
                    </Stack.Item>
                </Stack>
            </FocusZone>
        </bladeContext.Provider>
    </div>

    function renderTitle(): JSX.Element {
        return <Stack verticalAlign="center">
            <Text variant="xLarge">{props.title ?? ""}</Text>
        </Stack>;
    }

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
