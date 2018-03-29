import React from 'react';
import PropTypes from 'prop-types';

let electron = null;
let fs = null;
// Check if running on electron environment before requiring
if (window && window.process && window.process.type) {
  electron = window.require('electron');
  fs = electron.remote.require('file-system');
}

export default class ImageUploadButton extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(file) {
    fs.readFile(file, (err, data) => {
      if (err)
        throw err;
      this.props.onChange(Buffer.from(data).toString('base64'));
    });
  }

  render() {
    return (
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={(event) => this.handleChange(event.target.files[0].path)}
        onClick={(event) => event.target.value = null}
      />
    );
  }
}
