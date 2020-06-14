import * as React from "react";
import { Label, Slider, TextField, Button, Stack, Text, getTheme } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { BitsetsListBlade } from "./BitsetsListBlade";
import { OpcodesListBlade } from "./OpcodesListBlade";

import { Field } from "../Field";

export function ArchitectureBlade(): JSX.Element {

    const { openBlade } = useBlade();
    const theme = getTheme();

    return <Blade size={4} title="Architecture">
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Instruction Width" subLabel="in bits">
                <Slider min={1} max={256} defaultValue={8}></Slider>
            </Field>
            <Field label="Name" subLabel="of the Architecture">
                <TextField />
            </Field>
            <Stack.Item>
                <Stack horizontal tokens={{ childrenGap: theme.spacing.m }}>
                    <Button onClick={openBitsets}>Bitsets...</Button>
                    <Button onClick={openOpcodes}>Opcodes...</Button>
                </Stack>
            </Stack.Item>
        </Stack>
    </Blade>;

    function openBitsets(): void {
        openBlade(BitsetsListBlade);
    }

    function openOpcodes(): void {
        openBlade(OpcodesListBlade);
    }
}