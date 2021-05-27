import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { Fragment } from 'react';
const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    }
});

export default function DataTable({ rows, columns, handleEdit, deleteHandler, actionButtons }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell key="actions" align="left">
                                Actions
                            </TableCell>
                            {actionButtons ? <TableCell align="left"></TableCell> : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={`row-${index}`}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <Fragment key={`cell-${index}`}>
                                                    <TableCell align={column.align}>
                                                        {column.format
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                </Fragment>
                                            );
                                        })}

                                        {actionButtons ? (
                                            <TableCell>{actionButtons(row.id)}</TableCell>
                                        ) : null}

                                        <TableCell key={`actions-${index}`} align="left">
                                            <IconButton
                                                className="px-4"
                                                edge="end"
                                                onClick={() => {
                                                    deleteHandler(row.id);
                                                }}
                                                aria-label="delete">
                                                <i className="far fa-trash-alt hover:text-red-500 "></i>
                                            </IconButton>
                                            <IconButton
                                                className="px-4"
                                                edge="end"
                                                onClick={() => {
                                                    handleEdit(row.id);
                                                }}
                                                aria-label="delete">
                                                <i className="far fa-edit hover:text-lightBlue-600 "></i>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
