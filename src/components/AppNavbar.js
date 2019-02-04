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
  Hotkey,
  Hotkeys,
  HotkeysTarget,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { connect } from 'react-redux';
import { NAVBAR_HEIGHT } from '../helpers/constants';
import { saveFile } from '../middlewares/io';

const FileButton = ({ onNewFile, onOpenFile, onSave, onSaveAs }) => (
  <Popover
    content={
      <Menu>
        <Menu.Item
          text="Open new spritesheet..."
          label="Ctrl + N"
          onClick={onNewFile}
        />
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

class AppNavbar extends React.Component {
  renderHotkeys() {
    const { onNewFile, onOpenFile, saveFile } = this.props;

    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="ctrl + n"
          label="Open new spritesheet..."
          onKeyDown={onNewFile}
        />
        <Hotkey
          global={true}
          combo="ctrl + o"
          label="Open file..."
          onKeyDown={onOpenFile}
        />
        <Hotkey
          global={true}
          combo="ctrl + s"
          label="Save "
          onKeyDown={() => saveFile({ isSaveAs: false })}
        />
        <Hotkey
          global={true}
          combo="ctrl + shift + s"
          label="Save As..."
          onKeyDown={() => saveFile({ isSaveAs: true })}
        />
      </Hotkeys>
    );
  }

  render() {
    const { onNewFile, onOpenFile, saveFile } = this.props;

    return (
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
  }
}

AppNavbar.propTypes = {
  onOpenFile: PropTypes.func.isRequired,
  onNewFile: PropTypes.func.isRequired,
  saveFile: PropTypes.func.isRequired,
};

const AppNavbarWithHotkeys = HotkeysTarget(AppNavbar);

const mapDispatchToProps = {
  saveFile,
};

export default connect(
  null,
  mapDispatchToProps
)(AppNavbarWithHotkeys);
