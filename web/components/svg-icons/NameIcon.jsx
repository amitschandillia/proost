import grey from '@material-ui/core/colors/grey';


// For MaterialUI icons, refer to https://www.materialui.co/icons

const inputAdornmentIcon = {
  fill: grey[600],
};

const NameIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path style={inputAdornmentIcon} d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
    </svg>
  );
}

export default NameIcon;
