import React, { PropsWithChildren } from "react";
import { Stack, Label, Text, ICommandBarItemProps, CommandBar, ContextualMenuItemType } from "@fluentui/react";

export interface FieldProps {
    label: string,
    subLabel?: string,
    buttons?: ICommandBarItemProps[],
}

export function Field(props: PropsWithChildren<FieldProps>): JSX.Element {
    return <Stack.Item>
        { props.buttons 
            ? <CommandBar styles={{root: {padding: 0}}} items={[
                { key: "title", itemType: ContextualMenuItemType.Header, onRender: renderLabel }
            ]} farItems={props.buttons} />
            : renderLabel()
        }
        { props.children }
    </Stack.Item>;

    function renderLabel(): JSX.Element {
        return <Label>{props.label}
            { props.subLabel 
                ? <Text variant="small" style={{ opacity: 0.5 }}>{props.subLabel}</Text>
                : void 0 }
        </Label>
    }
}