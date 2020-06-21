import { Dialog as FluentDialog, DialogFooter, IModalProps, IDialogContentProps, PrimaryButton, Button, IButtonProps } from "@fluentui/react";
import React from "react";

export interface DialogProps {
    title?: string | JSX.Element,
    message?: string,
    onRenderBody?: () => JSX.Element,
    buttons?: IButtonProps[],
    onClose?: () => void;
}

export function Dialog(props: DialogProps): JSX.Element {

    const content: IDialogContentProps = {
        title: props.title,
        subText: props.message,
    };
    const modal: IModalProps = {
    }

    const buttons = !props.buttons
        ? undefined
        : props.buttons.map((b, i) => {
            if (i == 0)
                return <PrimaryButton {...b} onClick={click} />;
            return <Button {...b} onClick={click} />;

            function click<T>(e?: React.MouseEvent<T>): void {
                if (b.onClick)
                    b.onClick(e as any);
                sendClose();
            }
        });

    console.log({ type: 'Dialog', props });

    return <FluentDialog hidden={false} dialogContentProps={content} modalProps={modal} onDismiss={sendClose} >
        {props.onRenderBody ? props.onRenderBody() : undefined}
        <DialogFooter>
            {buttons}
        </DialogFooter>
    </FluentDialog>

    function sendClose(): void {
        if(props.onClose)
            props.onClose();
    }
}