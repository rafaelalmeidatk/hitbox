import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from '@blueprintjs/core';

const Window = ({ title }) => {
  return (
    <Card className="window">
      <h3>{title}</h3>
    </Card>
  );
};

Window.propTypes = {
  title: PropTypes.string,
};

export default Window;
