import React from 'react';
import PropTypes from 'prop-types';
import EyeIcon from 'react-icons/lib/fa/eye';
import EyeSlashIcon from 'react-icons/lib/fa/eye-slash';

export default class WindowToolsRow extends React.Component {
  static propTypes = {
    visibility: PropTypes.bool,
    visibilityValue: PropTypes.bool,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="window-tools-row">
        {
          this.props.visibility &&
          <li
            className="window-tools-icon"
            onClick={this.props.onClick}
          >
            {
              this.props.visibilityValue
                ? <EyeIcon size={14} />
                : <EyeSlashIcon size={14} />
            }
          </li>
        }
      </ul>
    );
  }
}
