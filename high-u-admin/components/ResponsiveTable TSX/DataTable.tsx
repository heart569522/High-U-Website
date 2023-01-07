import React, { Component } from 'react';
import Table, { TableProps } from '@mui/material/Table';
import TableBody, { TableBodyProps } from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead, { TableHeadProps } from '@mui/material/TableHead';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import { CellRenderer, LabelRenderer } from './Renderer';
import NoContent from './NoContent';
import Pagination from './Pagination';
import _isEqual from 'lodash.isequal';

interface Props {
  columns: any[];
  count: number;
  data: any[];
  noContentText: string;
  page: number;
  rowsPerPage: number;
  showPagination: boolean;
  TableBodyCellProps?: TableCellProps;
  TableBodyProps?: TableBodyProps;
  TableBodyRowProps?: TableRowProps;
  TableHeadCellProps?: TableCellProps;
  TableHeadProps?: TableHeadProps;
  TableHeadRowProps?: TableRowProps;
  TablePaginationProps?: any;
  TableProps?: TableProps;
  enableShouldComponentUpdate?: boolean;
  rowsClassArray?: string[];
  onChangePage: (event: any, page: number) => void;
}

export default class DataTable extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const { enableShouldComponentUpdate, data } = this.props;
    if (enableShouldComponentUpdate) {
      return (!_isEqual(nextProps.data, data));
    }
    return true;
  }

  handleChangePage = (event: any, page: number) => this.props.onChangePage(event, page);

  getRowClass = (index: number) => {
    const { rowsClassArray } = this.props;
    return rowsClassArray && rowsClassArray[index] ? rowsClassArray[index] : '';
  }

  render() {
    const {
      columns,
      count,
      data,
      noContentText,
      page,
      rowsPerPage,
      showPagination,
      TableBodyCellProps,
      TableBodyProps,
      TableBodyRowProps,
      TableHeadCellProps,
      TableHeadProps,
      TableHeadRowProps,
      TablePaginationProps,
      TableProps,
    } = this.props;
    if (
      !Array.isArray(data) ||
      data.length === 0 ||
      !Array.isArray(columns) ||
      columns.length === 0
    ) {
      return <NoContent text={noContentText} />
    }

    return (
      <Table {...TableProps}>
        <TableHead {...TableHeadProps}>
          <TableRow {...TableHeadRowProps}>
            {columns.map((column, index) => (
              <TableCell
                key={`${column.label}-${index}`}
                {...TableHeadCellProps}
              >
                <LabelRenderer column={column} data={data} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...TableBodyProps}>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={this.getRowClass(rowIndex)} {...TableBodyRowProps}>
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={`${rowIndex}-${columnIndex}`}
                  {...TableBodyCellProps}
                >
                  <CellRenderer column={column} row={row} data={data} />
                </TableCell>
              ))}
            </TableRow>
          ))
          }
        </TableBody>
        {
          showPagination &&
          <TableFooter>
            <TableRow>
              <Pagination
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                TablePaginationProps={TablePaginationProps}
                onChangePage={this.handleChangePage}
              />
            </TableRow>
          </TableFooter>
        }
      </Table >
    );
  }
}
