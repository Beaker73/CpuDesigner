import * as React from "react";
import { Label, Slider, TextField, Button, Stack, Text, getTheme } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { BitsetsListBlade } from "./BitsetsListBlade";
import { OpcodesListBlade } from "./OpcodesListBlade";

import { Field } from "../Field";
import { useStoreState, useStoreActions } from "../../Store";
import { bladeContext } from "./Host/BladeContext";

export function ArchitectureBlade(): JSX.Element {

    const { openBlade, showDialog } = useBlade();
    const { name, bitCount } = useStoreState(store => store.architecture);
    const { setName, setBitCount } = useStoreActions(store => store.architecture);
    const theme = getTheme();

    return <Blade title="Architecture">
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Instruction Width" subLabel="in bits">
                <Slider min={1} max={256} value={bitCount} onChange={n => setBitCount(n)}></Slider>
            </Field>
            <Field label="Name" subLabel="of the Architecture">
                <TextField value={name} onChange={(e,t) => setName(t ?? "")} />
            </Field>
            <Stack.Item>
                <Stack horizontal tokens={{ childrenGap: theme.spacing.m }}>
                    <Button onClick={openBitsets}>Bitsets...</Button>
                    <Button onClick={openOpcodes}>Opcodes...</Button>
                    <Button onClick={testDialog}>Test...</Button>
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
    function testDialog(): void {
        showDialog({
            title: "test",
            message: "Banaan",
        })
    }
}