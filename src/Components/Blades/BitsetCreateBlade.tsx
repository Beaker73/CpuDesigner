import React, { useState } from "react";
import { uuid, newUuid } from "../../Types/uuid";
import { Stack, TextField, Text, Slider, ICommandBarItemProps, getTheme, DetailsList, IColumn, SelectionMode, CommandBar } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { Field } from "../Field";

import { useStoreState, useStoreActions } from "../../Store";
import { BitsetEditBlade } from "./BitsetEditBlade";

export interface BitsetCreateBladeProps {
}

export function BitsetCreateBlade(props: BitsetCreateBladeProps): JSX.Element {

    const getBitsetByName = useStoreState(store => store.bitsets.getBitsetByName);
    const newBitset = useStoreActions(store => store.bitsets.newBitset);
    const blade = useBlade();

    const [name, setName] = useState("");
    const [bitCount, setBitCount] = useState(8);
    const [canSave, setCanSave] = useState(false);

    const buttons: ICommandBarItemProps[] = [
        { key: "save", name: "Create", iconProps: { iconName: "Save" }, onClick: createBitset, disabled: !canSave },
    ];

    const theme = getTheme();

    return <Blade title="New bitset" buttons={buttons}>
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Name" subLabel="of the Bitset">
                <TextField required onChange={updateName} />
            </Field>
            <Field label="Size" subLabel="in bits, of the Bitset">
                <Slider min={1} max={16} defaultValue={8} onChange={setBitCount} />
            </Field>
        </Stack>
    </Blade>;

    function updateName(e: React.FormEvent, newName?: string): void {
        setName(newName ?? "");
        setCanSave(typeof newName === "string" && newName.length > 1 && !getBitsetByName(newName));
    }

    function createBitset(): void {
        if (canSave) {
            const id = newUuid();
            newBitset({ id, bitCount, name });
            blade.replaceBlade(BitsetEditBlade, { bitsetId: id })
        }
    }
}
