/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

// For MaterialUI icons, refer to:
// https://www.materialui.co/icons
// https://material.io/resources/icons/?style=baseline

const styles = (theme) => ({
  root: {
    fill: theme.palette.icon.default,
  },
});

const WithGradient = (props) => {
  const {
    d, angle = 'diagonal', size, gradientName = null,
  } = props;
  const width = size ? size * 8 : 24;
  const { colors } = require(`../../gradients/${gradientName}`);
  const gradientID = uuidv4();
  const fill = `url(#${gradientID})`;
  let x2; let
    y2;
  if (angle === 'vertical') { x2 = '100%'; y2 = '0%'; }
  if (angle === 'diagonal') { x2 = '100%'; y2 = '100%'; }
  if (angle === 'horizontal') { x2 = '0%'; y2 = '100%'; }
  return (
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation" style={{ fill, width }}>
      <path d={d} />
      <linearGradient id={gradientID} x1="0%" y1="0%" x2={x2} y2={y2}>
        {colors.map((value) => (
          <stop offset={value.offset} style={{ stopColor: value.color, stopOpacity: 1 }} />
        ))}
      </linearGradient>
    </svg>
  );
};

const WithoutGradient = (props) => {
  const { classes, d, size } = props;
  const width = size ? size * 8 : 24;
  return (
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation" style={{ width }}>
      <path
        className={classes.root}
        d={d}
      />
    </svg>
  );
};

const IconTemplate = (props) => {
  const { gradientName = null } = props;
  if (gradientName) return (<WithGradient {...props} />);
  return (<WithoutGradient {...props} />);
};

WithGradient.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.shape({
      fill: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  d: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  gradientName: PropTypes.string.isRequired,
};

WithoutGradient.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.shape({
      fill: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  d: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

IconTemplate.propTypes = {
  gradientName: PropTypes.string.isRequired,
};

export default withStyles(styles)(IconTemplate);
