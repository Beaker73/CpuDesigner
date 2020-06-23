import React from "react";

import { uuid } from "../../Types";
import { Blade } from "./Host";
import { useStoreState, useStoreActions } from "../../Store";
import { Field } from "../Field";
import { TextField, Stack, getTheme, DefaultButton, CommandBar, ICommandBarItemProps, ContextualMenuItemType, VerticalDivider } from "@fluentui/react";

export interface OpcodeBladeProps {
    id: uuid;
}

export function OpcodeBlade(props: OpcodeBladeProps): JSX.Element {

    const theme = getTheme();

    const instr = useStoreState(state => state.instructions.all[props.id])!;
    const sets = useStoreState(state => Object.values(state.bitsets.bitSetsById).map(bs => ({ key: bs.id, text: bs.name })));
    const { updateMnemonic, updateDescription } = useStoreActions(state => state.instructions);

    const editButtons: ICommandBarItemProps[] = [
        { key: "zero", text: "0", iconProps: { iconName: "Add" }, onClick: e => insertBit(false) },
        { key: "sep0", onRender: () => <VerticalDivider /> },
        { key: "one", text: "1", iconProps: { iconName: "Add" }, onClick: e => insertBit(true) },
        { key: "sep1", onRender: () => <VerticalDivider /> },
        {
            key: "set", text: "Sets", iconProps: { iconName: "List" }, subMenuProps: {
                items: sets.map(s => ({
                    ...s,
                    onClick: e => insertBitset(s.key),
                })),
            }
        },
    ];

    return <Blade title={instr.mnemonic}>
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Mnemonic" subLabel="for the Instruction">
                <TextField value={instr.mnemonic} onChange={onUpdateMnemonic} />
            </Field>
            <Field label="Description" subLabel="of the Instruction">
                <TextField value={instr.description} onChange={onUpdateDescription} multiline rows={3} />
            </Field>
            <Field label="Bits" subLabel="comprising the instruction">
                <CommandBar items={editButtons} />
            </Field>
        </Stack>
    </Blade>

    function onUpdateMnemonic<T>(e: React.FormEvent<T>, newMnemonic?: string) {
        updateMnemonic({ id: instr.id, mnemonic: newMnemonic ?? "" });
    }
    function onUpdateDescription<T>(e: React.FormEvent<T>, newDescription?: string) {
        updateDescription({ id: instr.id, description: newDescription ?? "" });
    }

    function insertBit(bit: boolean) {
    }
    function insertBitset(bitsetId: uuid) {
    }
}