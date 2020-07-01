import React from "react";

import { Checkbox } from "@fluentui/react";

export interface BitEditorProps {
    value?: boolean;
    onValueChanged: (value?: boolean) => void;
}

export function BitEditor(props: BitEditorProps): JSX.Element {
    return <Checkbox checked={props.value} onChange={valueChanged} />;

    function valueChanged(e: any, newValue?: boolean) {
        if (props.onValueChanged)
            props.onValueChanged(newValue ?? false);
    }
}