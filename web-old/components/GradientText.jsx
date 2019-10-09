import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({});

const GradientText = (props) => {
  const {
    classes,
    children,
    gradientName = null,
    angle = 'diagonal',
    ...otherProps
  } = props;
  let background = 'linear-gradient(';
  const { colors } = require(`../gradients/${gradientName}`);
  if (angle === 'vertical') { background += '90deg,'; }
  if (angle === 'diagonal') { background += '45deg,'; }
  if (angle === 'horizontal') { background += '180deg,'; }
  colors.map((value, index) => {
    background += ` ${value.color},`;
  });
  background = `${background.slice(0, -1)})`;
  return (
    <Typography
      {...otherProps}
      style={{
        background,
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
      }}
    >
      {children}
    </Typography>
  );
};

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(GradientText);
