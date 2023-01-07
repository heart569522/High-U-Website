import React, { Component } from 'react'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'

interface Props {
  component?: any;
  count: number;
  rowsPerPage: number;
  page: number;
  TablePaginationProps?: any;
  onChangePage: (event: any, page: number) => void;
}

export default class Pagination extends Component<Props> {
  handleChangePage = (event: any, page: number) => this.props.onChangePage(event, page)

  render() {
    const {
      component,
      count,
      rowsPerPage,
      page,
      TablePaginationProps,
    } = this.props

    return (
      <TablePagination
        {...TablePaginationProps}
        component={component || TableCell}
        count={count}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        page={page}
        onChangePage={this.handleChangePage}
      />
    )
  }
}