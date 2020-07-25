import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  table: {},
});

const RenderedTable = ({rendererProps, classes}) => {
  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" {...rendererProps} />
    </TableContainer>
  );
};

RenderedTable.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedTable);
