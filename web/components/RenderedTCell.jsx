import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  th: {},
  td: {},
});

const RenderedTCell = ({rendererProps, classes}) => {
  const {isHeader, children} = rendererProps;
  const {th, td} = classes;
  let cell;
  if(isHeader) {
    cell = <TableCell className={th}>{children}</TableCell>
  } else {
    cell = <TableCell className={td}>{children}</TableCell>
  }
  return (
    <>
      {cell}
    </>
  );
};

RenderedTCell.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedTCell);
