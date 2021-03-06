import React, { useState, useEffect, useMemo } from "react";
import { uuid, newUuid } from "../../Types/uuid";
import { Stack, TextField, Text, Slider, ICommandBarItemProps, getTheme, DetailsList, IColumn, Selection, CommandBar, mergeStyleSets, SelectionMode, IContextualMenuItemProps, IContextualMenuItem, ContextualMenuItemType, replaceElement } from "@fluentui/react";

import { Blade, useBlade } from "@beaker73/fluentui-blades";
import { Field } from "../Field";
import { BitsetValueBlade } from "./BitsetValueBlade";

import { useStoreState, useStoreActions } from "../../Store";
import { FixedUInt } from "../../Types/FixedUInt";

export interface BitsetBladeProps {
    id: uuid;
}

type Item = { value: FixedUInt, name: string };

export function BitsetBlade(props: BitsetBladeProps): JSX.Element {

    const blade = useBlade();
    const theme = getTheme();
    const style = useMemo(useStyle, [theme]);

    const bitSet = useStoreState(store => store.bitsets.bitSetsById[props.id]);
    const isInUse = useStoreState(store => {
        return store.bitsets.isBitsetInUse(props.id)
    });
    const { setName, setBitCount, generateSet, deleteBitset, cloneBitset } = useStoreActions(store => store.bitsets);

    const buttons: ICommandBarItemProps[] = [
        { key: "generate", text: "Generate", iconProps: { iconName: "NumberedList" }, onClick: requestGenerate },
    ];
    const menuItems: IContextualMenuItem[] = [
        { key: "clone", text: "Clone Bitset", iconProps: { iconName: "Copy" }, onClick: clone },
        { key: "line1", itemType: ContextualMenuItemType.Divider },
        { key: "delete", text: "Delete Bitset", iconProps: { iconName: "Delete", style: { color: theme.semanticColors.severeWarningIcon } }, onClick: requestDelete },
    ];

    const columns: IColumn[] = [
        { key: "value", name: "Value", minWidth: 150, onRender: renderValue },
        { key: "name", name: "Name", minWidth: 100, fieldName: "name" },
    ];

    const values = (bitSet?.values ? [...bitSet.values.items()] : [])
        .map(i => ({ value: i[0], name: i[1].name }))
        .sort((a, b) => {
            const cmp = a.value.value - b.value.value;
            if (cmp < 0n)
                return -1;
            if (cmp > 0n)
                return 1;
            return 0;
        });

    return <Blade title={bitSet?.name || "New bitset"} buttons={buttons} menuItems={menuItems}>
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Name" subLabel="of the Bitset">
                <TextField value={bitSet?.name} onChange={onNameChanged} />
            </Field>
            <Field label="Size" subLabel="in bits, of the Bitset">
                <Slider min={1} max={16} value={bitSet?.bitCount} onChange={onBitCountChanged} disabled={!!bitSet.values} />
            </Field>
            <DetailsList columns={columns} items={values} selectionMode={SelectionMode.none} onActiveItemChanged={editItem} />
        </Stack>
    </Blade>;

    function renderValue(item: Item) {
        const spans: JSX.Element[] = [];
        for (let i = 0; i < bitSet.bitCount; i++) {
            const bit = item.value.getBit(bitSet.bitCount - 1 - i);
            const span = <span key={i} className={`${style.bit} ${bit ? style.bit1 : style.bit0}`}>
                {bit ? "1" : "0"}
            </span>;
            spans.push(span);
        }
        return spans;
    }

    function onNameChanged(e: React.FormEvent, name?: string) {
        setName({ id: props.id, name: name ?? "" });
    }
    function onBitCountChanged(bitCount: number) {
        setBitCount({ id: props.id, bitCount });
    }
    function editItem(item: Item): void {
        if (bitSet && item) {
            blade.openBlade(BitsetValueBlade, { bitsetId: bitSet.id, value: item.value });
        }
    }

    function requestDelete() {

        if (isInUse)
            blade.showDialog({
                title: "Bitset in use",
                message: "This bitset is in use by one or more instructions. Therefore it cannot be deleted at this time.",
                buttons: [
                    { text: "Understood" }
                ]
            })
        else
            blade.showDialog({
                title: "Delete Bitset",
                variant: "SevereWarning",
                message: `Are you sure you want to delete the bitset ${bitSet?.name}?`,
                buttons: [
                    { text: "Delete", onClick: executeDelete },
                    { text: "Cancel" }
                ]
            });

        function executeDelete() {
            deleteBitset({ id: bitSet.id });
            blade.closeBlade();
        }
    }


    /** Generates a full set of items based on the bitCount */
    function requestGenerate() {
        if (!bitSet.values) {
            // first time generate will lock bitCount
            // warn user about this.
            blade.showDialog({
                title: "Generate Bitset Values",
                message: "Do you want to generate a full set of values for the bit? This will lock the bit count of the set.",
                buttons: [
                    { text: "Generate", onClick: executeGenerate },
                    { text: "Cancel" }
                ]
            });
        } else {
            executeGenerate();
        }

        function executeGenerate() {
            generateSet({ id: props.id });
        }
    }

    /** Clones this bitset */
    function clone() {
        const newId = newUuid();
        cloneBitset({ bitsetToCloneId: bitSet.id, newId });
        blade.replaceBlade(BitsetBlade, { id: newId });
    }

    function useStyle() {
        return mergeStyleSets({
            bit: {
                paddingLeft: theme.spacing.s1,
                paddingRight: theme.spacing.s1,
                border: theme.semanticColors.inputBorder,
            },
            bit0: {
                background: theme.semanticColors.bodyBackground,
                color: theme.semanticColors.bodyText,
            },
            bit1: {
                background: theme.palette.themeLighter,
                color: theme.semanticColors.bodyText,
            }
        })
    }

}
