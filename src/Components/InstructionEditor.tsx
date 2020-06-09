import * as React from "react";

import { Stack } from "@fluentui/react";

// store
import { Instruction } from "../Store/Instructions/Models";
import { useStoreState } from "../Store";

// components
import { BitEditor } from "./BitEditor";

export interface InstructionEditorProps {
    instruction: Instruction;
}

export function InstructionEditor(props: InstructionEditorProps): JSX.Element {

    const bitCount = useStoreState(store => store.configuration.bits);

    const bits: JSX.Element[] = [];
    for (let i = bitCount; i >= 0; i--)
        bits.push(<BitEditor key={i}></BitEditor>);

    return <Stack horizontal>
        {bits}
    </Stack>;
}