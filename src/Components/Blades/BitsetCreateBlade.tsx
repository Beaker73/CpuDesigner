import React, { useState } from "react";
import { uuid, newUuid } from "../../Types/uuid";
import { Stack, TextField, Text, Slider, ICommandBarItemProps, getTheme, DetailsList, IColumn, SelectionMode, CommandBar } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { Field } from "../Field";

import { useStoreState, useStoreActions } from "../../Store";

export interface BitsetCreateBladeProps {
    id: uuid;
}

export function BitsetCreateBlade(props: BitsetCreateBladeProps): JSX.Element {

    const theme = getTheme();

    return <Blade title="New bitset">
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Name" subLabel="of the Bitset">
                <TextField required onChange={updateName} />
            </Field>
            <Field label="Size" subLabel="in bits, of the Bitset">
                <Slider min={1} max={16} defaultValue={3} onChange={updateBitCount} />
            </Field>
        </Stack>
    </Blade>;

    function updateName(e: React.FormEvent, newName?: string): void {
    }

    function updateBitCount(bitCount: number) {
    }
}
