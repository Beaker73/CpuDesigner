import * as React from "react";

import { Blade } from "./BladeList";
import { Label, Slider, TextField, Button, Stack, Text, getTheme } from "@fluentui/react";

export function ArchitectureBlade(): JSX.Element {

    const theme = getTheme();

    return <Blade size={4} title="Architecture">
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Stack.Item>
                <Label>Instruction Width <Text variant="small" style={{opacity: 0.5}}>in bits</Text></Label>
                <Slider min={1} max={256} defaultValue={8}></Slider>
            </Stack.Item>
            <Stack.Item>
                <Label>Name <Text variant="small" style={{opacity: 0.5}}>of the Architecture</Text></Label>
                <TextField />
            </Stack.Item>
            <Button>Opcodes...</Button>
        </Stack>
    </Blade>
}