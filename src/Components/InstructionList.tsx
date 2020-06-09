import * as React from "react";
import { Stack, Button, getTheme } from "@fluentui/react";

// helpers
import { dictToArray } from "../Types";

// store
import { useStoreState, useStoreActions, Instruction } from "../Store";

// components
import { InstructionEditor } from "./InstructionEditor";

export function InstructionList(): JSX.Element {

    var theme = getTheme();

    var instructions: Instruction[] = useStoreState(store => dictToArray(store.instructions.all));
    var newInstruction = useStoreActions(store => store.instructions.newInstruction);

    var ins: JSX.Element[] = instructions.map(i =>
        <InstructionEditor key={i.id} instruction={i} />
    );

    return <Stack tokens={{childrenGap: theme.spacing.m}}>
        <Stack horizontal tokens={{childrenGap: theme.spacing.m}}>
            <Button onClick={add}>New</Button>
        </Stack>
        {ins}
    </Stack>;

    function add(): void {
        newInstruction();
    }
}