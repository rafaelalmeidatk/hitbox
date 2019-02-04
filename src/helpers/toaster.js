import { Position, Toaster, Intent, setHotkeysDialogProps } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

// Apply dark theme to hotkeys dialog
setHotkeysDialogProps({ className: 'bp3-dark' });

export const AppToaster = Toaster.create({
  position: Position.TOP,
});

export function showSuccessMessage(message) {
  AppToaster.show({
    message,
    icon: IconNames.TICK_CIRCLE,
    intent: Intent.SUCCESS,
    timeout: 3000,
  });
}

export function showErrorMessage(message) {
  AppToaster.show({
    message,
    icon: IconNames.WARNING_SIGN,
    intent: Intent.DANGER,
  });
}
