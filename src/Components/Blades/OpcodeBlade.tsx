import React, { useMemo, CSSProperties } from "react";

import { uuid, FixedUInt } from "../../Types";
import { Blade } from "./Host";
import { useStoreState, useStoreActions, useExpandedInstruction } from "../../Store";
import { Field } from "../Field";
import { TextField, Stack, getTheme, DefaultButton, CommandBar, ICommandBarItemProps, ContextualMenuItemType, VerticalDivider, mergeStyleSets } from "@fluentui/react";

export interface OpcodeBladeProps {
    id: uuid;
}

export function OpcodeBlade(props: OpcodeBladeProps): JSX.Element {

    const theme = getTheme();
    const style = useMemo(useStyle, [theme]);

    const bitCount = useStoreState(state => state.architecture.bitCount);
    const instr = useExpandedInstruction(props.id);
    const sets = useStoreState(state => Object.values(state.bitsets.bitSetsById).map(bs => ({ key: bs.id, text: bs.name })));
    const { updateMnemonic, updateDescription, addBit, addBitset } = useStoreActions(state => state.instructions);

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


    const bits: JSX.Element[] = [];
    // process all sets
    let cnt = 0;
    let b = "";
    for (const set of instr.bitSets) {
        if (typeof set !== "string") {
            // walk from high bit to low (left-right)
            for (var i = set.bitCount - 1; i >= 0; i--) {
                let c = '';
                console.log({ set });
                if (set instanceof FixedUInt)
                    c = set.getBit(i) ? '1' : '0';
                else
                    c = '•';
                const bitBack: CSSProperties = {
                    background: c == '0' ? theme.semanticColors.disabledBackground
                              : c == '1' ? theme.semanticColors.bodyBackground
                                         : theme.palette.themeLighter,
                    color     : c == '0' ? theme.semanticColors.disabledText
                              : c == '1' ? theme.semanticColors.bodyText
                                         : theme.semanticColors.bodyText,
                    borderColor:c != '0' && c != '1' ? theme.palette.themeTertiary : undefined,
                };
                b += c;
                bits.push(<Stack className={style.bit} style={bitBack} horizontal horizontalAlign="center" verticalAlign="baseline">
                    {c}
                </Stack>);
                cnt++;
                if (cnt % bitCount == 0) {
                    const v = parseInt(b.replace(/•/g, '0'), 2).toString(16);
                    console.log({b, r: b.replace(/•/g, '0'), v});
                    bits.push(<Stack className={style.value} horizontal verticalAlign="baseline">0x{v}</Stack>)
                    bits.push(<br />);
                    b = "";
                }
            }
        }
    }

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
                <Stack horizontal className={style.bitContainer} tokens={{ childrenGap: theme.spacing.s2 }}>
                    {bits}
                </Stack>
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
        addBit({ id: instr.id, bit });
    }
    function insertBitset(bitsetId: uuid) {
        addBitset({ id: instr.id, bitsetId });
    }

    function useStyle() {
        return mergeStyleSets({
            bitContainer: {
                marginTop: theme.spacing.m,
            },
            bit: {
                width: 24, height: 24,
                border: `solid 1px ${theme.palette.neutralTertiary}`,
                borderRadius: theme.effects.roundedCorner2,
                boxShadow: theme.effects.elevation4,
            },
            value: {
                width: 24, height: 24,
                border: `solid 1px transparent`,
            }
        })
    }
}