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

const FileButton = ({ onNewFile, onOpenFile, onSave, onSaveAs }) => (
  <Popover
    content={
      <Menu>
        <Menu.Item text="New..." label="Ctrl + N" onClick={onNewFile} />
        <Menu.Item text="Open..." label="Ctrl + O" onClick={onOpenFile} />
        <Menu.Divider />
        <Menu.Item text="Save" label="Ctrl + S" onClick={onSave} />
        <Menu.Item
          text="Save As..."
          label="Ctrl + Shift + S"
          onClick={onSaveAs}
        />
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
  onOpenFile: PropTypes.func.isRequired,
  onNewFile: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAs: PropTypes.func.isRequired,
};

const AppNavbar = ({ onNewFile, onOpenFile, saveFile }) => (
  <Navbar style={{ height: NAVBAR_HEIGHT }}>
    <NavbarGroup style={{ height: NAVBAR_HEIGHT }}>
      <NavbarHeading>Hitbox</NavbarHeading>
      <NavbarDivider />
      <FileButton
        onNewFile={onNewFile}
        onOpenFile={onOpenFile}
        onSave={() => saveFile({ isSaveAs: false })}
        onSaveAs={() => saveFile({ isSaveAs: true })}
      />
      <Button icon={IconNames.COG} text="Settings" minimal />
    </NavbarGroup>
  </Navbar>
);

AppNavbar.propTypes = {
  onOpenFile: PropTypes.func.isRequired,
  onNewFile: PropTypes.func.isRequired,
  saveFile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  saveFile,
};

export default connect(
  null,
  mapDispatchToProps
)(AppNavbar);
