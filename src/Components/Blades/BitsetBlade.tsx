import React, { useState } from "react";
import { uuid, newUuid } from "../../Types/uuid";
import { Stack, TextField, Text, Slider, ICommandBarItemProps, getTheme, DetailsList, IColumn, SelectionMode, CommandBar } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { Field } from "../Field";

import { useStoreState, useStoreActions } from "../../Store";

export interface BitsetBladeProps {
    id: uuid;
}

export function BitsetBlade(props: BitsetBladeProps): JSX.Element {

    const theme = getTheme();
    const bitSet = useStoreState(store => store.bitsets.bitSetsById[props.id]);
    const { setName, setBitCount } = useStoreActions(store => store.bitsets);

    return <Blade title="New bitset">
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Name" subLabel="of the Bitset">
                <TextField required value={bitSet?.name} onChange={onNameChanged} />
            </Field>
            <Field label="Size" subLabel="in bits, of the Bitset">
                <Slider min={1} max={16} value={bitSet?.bitCount} onChange={onBitCountChanged} />
            </Field>
        </Stack>
    </Blade>;

    function onNameChanged(e: React.FormEvent, name?: string) {
        setName({ id: props.id, name: name ?? "" });
    }
    function onBitCountChanged(bitCount: number) {
        setBitCount({ id: props.id, bitCount });
    }



}
