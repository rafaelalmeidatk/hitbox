import React from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Position,
  Popover,
  Button,
  Menu,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { NAVBAR_HEIGHT } from '../helpers/constants';

const FileButton = () => (
  <Popover
    content={
      <Menu>
        <Menu.Item text="New File" label="Ctrl + N" />
        <Menu.Item text="Open File..." label="Ctrl + O" />
        <Menu.Divider />
        <Menu.Item text="Save" label="Ctrl + S" />
        <Menu.Item text="Save As..." label="Ctrl + Shift + S" />
        <Menu.Divider />
        <Menu.Item text="Exit" label="Ctrl + Q" />
      </Menu>
    }
    position={Position.BOTTOM}
  >
    <Button icon={IconNames.DOCUMENT} text="File" minimal />
  </Popover>
);

const AppNavbar = () => (
  <Navbar style={{ height: NAVBAR_HEIGHT }}>
    <NavbarGroup style={{ height: NAVBAR_HEIGHT }}>
      <NavbarHeading>Hitbox</NavbarHeading>
      <NavbarDivider />
      <FileButton />
      <Button icon={IconNames.COG} text="Settings" minimal />
    </NavbarGroup>
  </Navbar>
);

export default AppNavbar;
