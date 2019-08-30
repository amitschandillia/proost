import PropTypes from 'prop-types';
import iconsTheme from '../../themes/icons-theme';

// For MaterialUI icons, refer to:
// https://www.materialui.co/icons
// https://material.io/resources/icons/?style=baseline

const IconTemplate = (props) => {
  const { d } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill={iconsTheme.palette.primary.main}
        d={d}
      />
    </svg>
  );
};
export default IconTemplate;

IconTemplate.propTypes = {
  d: PropTypes.string.isRequired,
};
