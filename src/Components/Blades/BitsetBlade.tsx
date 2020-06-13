import React, { useState } from "react";
import { uuid } from "../../Types/uuid";
import { Stack, TextField, Text, Slider, ICommandBarItemProps, getTheme, DetailsList, IColumn, SelectionMode, CommandBar } from "@fluentui/react";

import { Blade } from "./Host";
import { Field } from "../Field";

import { useStoreState } from "../../Store";
import { BitEditor } from "../BitEditor";

export interface BitsetBladeProps {
    bitsetId?: uuid;
}

export function BitsetBlade(props: BitsetBladeProps): JSX.Element {

    const isNewBitset = !(typeof props.bitsetId === "string");
    const bitSet = useStoreState(store => props.bitsetId ? store.bitsets.getBitsById(props.bitsetId) : void 0);

    const [name, setName] = useState<string>();

    const buttons: ICommandBarItemProps[] = [
        { key: "save", name: "Save", iconProps: { iconName: "Save" } },
    ];

    const columns: IColumn[] = [
        { key: "bits", name: "Bits", minWidth: 150, isRowHeader: true, onRender: renderBits },
        { key: "name", name: "Name", minWidth: 100 },
    ];

    const theme = getTheme();

    return <Blade size={4} title="New bitset" buttons={buttons}>
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Name" subLabel="of the Bitset">
                {isNewBitset
                    ? <TextField value={name} readOnly={!isNewBitset} />
                    : <Text>bitSet?.Name</Text>
                }
            </Field>
            <Field label="Size" subLabel=" in bits, of the Bitset">
                <Slider min={1} max={16} defaultValue={8}></Slider>
            </Field>
            <Field label="Items" subLabel=" in the bitset" buttons={[
                    { key: 'add', click: addItem, iconOnly: true, iconProps: { iconName: "Add" } },
                    { key: 'remove', iconOnly: true, iconProps: { iconName: "Remove" } },
                ]}>
                <DetailsList selectionMode={SelectionMode.none} columns={columns} items={[]}/>
            </Field>
        </Stack>
    </Blade>

    function renderBits(): JSX.Element {
        return <BitEditor />
    }

    function addItem(): void {
        
    }
}