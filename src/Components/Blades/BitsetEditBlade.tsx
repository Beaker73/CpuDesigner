import React, { useState } from "react";
import { uuid, newUuid } from "../../Types/uuid";
import { Stack, TextField, Text, Slider, ICommandBarItemProps, getTheme, DetailsList, IColumn, SelectionMode, CommandBar } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { Field } from "../Field";

import { useStoreState, useStoreActions } from "../../Store";

export interface BitsetEditBladeProps {
    bitsetId: uuid;
}

export function BitsetEditBlade(props: BitsetEditBladeProps): JSX.Element {

    const bitSet = useStoreState(store => store.bitsets.getBitsetById(props.bitsetId));
    if (!bitSet)
        throw new Error(`Bitset ${props.bitsetId} missing`);
    const blade = useBlade();

    const buttons: ICommandBarItemProps[] = [
        { key: "save", name: "Save", iconProps: { iconName: "Save" } },
    ];

    const theme = getTheme();

    return <Blade title="Edit bitset" buttons={buttons}>
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Name" subLabel="of the Bitset">
                {bitSet?.name}
            </Field>
            <Field label="Size" subLabel="in bits, of the Bitset">
                {bitSet?.bitCount}
            </Field>
        </Stack>
    </Blade>;
}
