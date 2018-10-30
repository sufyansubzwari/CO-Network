import React, { Component } from "react";
import react from "react";
import { Container } from "btech-layout";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

/**
 * @module Data
 * @category confirmAlert
 * @description This component is a wrapper for the confirmAlert
 */
class ConfirmPopup {
  constructor() {
    this.options = {
      title: "Remove this entity",
      message: "Are you sure to want delete this entity",
      childrenElement: () => <Container />
      // customUI: ({ title, message, onClose }) => <div>Custom UI</div>,
      // willUnmount: () => {}
    };
  }

  confirmPopup(onAcceptAction, onCancelOption, options) {
    const customOptions = Object.assign({ ...this.options }, options);
    const acceptButton = {
      label: "Yes",
      onClick: () => onAcceptAction && onAcceptAction()
    };
    const cancelButton = {
      label: "Cancel",
      onClick: () => onCancelOption && onCancelOption()
    };
    if (!customOptions.buttons)
      customOptions.buttons = [acceptButton, cancelButton];
    else customOptions.buttons.concat([acceptButton, cancelButton]);
    return confirmAlert(customOptions);
  }
}

export default new ConfirmPopup();
