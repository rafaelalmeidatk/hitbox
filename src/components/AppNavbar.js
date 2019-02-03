import React from 'react';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';
import { NAVBAR_HEIGHT } from '../helpers/constants';
import { saveFile } from '../middlewares/io';

const FileButton = ({ onNewFile, onSave }) => (
  <Popover
    content={
      <Menu>
        <Menu.Item text="New..." label="Ctrl + N" onClick={onNewFile} />
        <Menu.Item text="Open..." label="Ctrl + O" />
        <Menu.Divider />
        <Menu.Item text="Save" label="Ctrl + S" onClick={onSave} />
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

FileButton.propTypes = {
  onNewFile: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const AppNavbar = ({ onNewFile, saveFile }) => (
  <Navbar style={{ height: NAVBAR_HEIGHT }}>
    <NavbarGroup style={{ height: NAVBAR_HEIGHT }}>
      <NavbarHeading>Hitbox</NavbarHeading>
      <NavbarDivider />
      <FileButton onNewFile={onNewFile} onSave={saveFile} />
      <Button icon={IconNames.COG} text="Settings" minimal />
    </NavbarGroup>
  </Navbar>
);

AppNavbar.propTypes = {
  onNewFile: PropTypes.func.isRequired,
  saveFile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  saveFile,
};

export default connect(null, mapDispatchToProps)(AppNavbar);
