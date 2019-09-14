import IconTemplate from './IconTemplate';

// For MaterialUI icons, refer to:
// https://www.materialui.co/icons
// https://material.io/resources/icons/?style=baseline

const d = 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z';

export default function (props) {
  return <IconTemplate {...props} d={d} />;
}
