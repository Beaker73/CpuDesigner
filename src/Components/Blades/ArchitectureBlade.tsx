import * as React from "react";
import { Label, Slider, TextField, Button, Stack, getTheme, ICommandBarItemProps } from "@fluentui/react";

import { Blade, useBlade } from "@beaker73/fluentui-blades";
import { BitsetsListBlade } from "./BitsetsListBlade";
import { OpcodesListBlade } from "./OpcodesListBlade";
import { ImportExportBlade } from "./ImportExportBlade";

import { Field } from "../Field";
import { useStoreState, useStoreActions } from "../../Store";

export function ArchitectureBlade(): JSX.Element {

    const { openBlade, showDialog } = useBlade();
    const { name, bitCount } = useStoreState(store => store.architecture);
    const { setName, setBitCount } = useStoreActions(store => store.architecture);
    const theme = getTheme();

    const buttons: ICommandBarItemProps[] = [
        { key: "export", text: "Export", iconProps: { iconName: "Save" }, onClick: openExport },
    ];

    return <Blade title="Architecture" buttons={buttons}>
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Instruction Width" subLabel="in bits">
                <Slider min={1} max={32} value={bitCount} onChange={n => setBitCount(n)}></Slider>
            </Field>
            <Field label="Name" subLabel="of the Architecture">
                <TextField value={name} onChange={(e, t) => setName(t ?? "")} />
            </Field>
            <Stack.Item>
                <Stack horizontal tokens={{ childrenGap: theme.spacing.m }}>
                    <Button onClick={openBitsets}>Bitsets</Button>
                    <Button onClick={openOpcodes}>Opcodes</Button>
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
    function openExport(): void {
        openBlade(ImportExportBlade);
    }
}