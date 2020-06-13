import * as React from "react";
import { Label, Slider, TextField, Button, Stack, Text, getTheme } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { BitsetsListBlade } from "./BitsetsListBlade";

export function ArchitectureBlade(): JSX.Element {

    const { openBlade } = useBlade();
    const theme = getTheme();

    return <Blade size={4} title="Architecture">
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Stack.Item>
                <Label>Instruction Width <Text variant="small" style={{ opacity: 0.5 }}>in bits</Text></Label>
                <Slider min={1} max={256} defaultValue={8}></Slider>
            </Stack.Item>
            <Stack.Item>
                <Label>Name <Text variant="small" style={{ opacity: 0.5 }}>of the Architecture</Text></Label>
                <TextField />
            </Stack.Item>
            <Stack.Item>
                <Stack horizontal tokens={{ childrenGap: theme.spacing.m }}>
                    <Button onClick={openBitsets}>Bitsets...</Button>
                    <Button>Opcodes...</Button>
                </Stack>
            </Stack.Item>
        </Stack>
    </Blade>;

    function openBitsets(): void {
        debugger;
        openBlade(BitsetsListBlade);
    }
}