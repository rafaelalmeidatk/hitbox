import React from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { NAVBAR_HEIGHT } from '../helpers/constants';

const AppNavbar = () => (
  <Navbar style={{ height: NAVBAR_HEIGHT }}>
    <NavbarGroup style={{ height: NAVBAR_HEIGHT }}>
      <NavbarHeading>Hitbox</NavbarHeading>
      <NavbarDivider />
      <Button icon={IconNames.DOCUMENT} text="File" minimal />
      <Button icon={IconNames.COG} text="Settings" minimal />
    </NavbarGroup>
  </Navbar>
);

export default AppNavbar;
