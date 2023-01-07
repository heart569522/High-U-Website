import React, { Component } from 'react'
import Hidden from '@mui/material/Hidden'

import DataList from './DataList'
import DataTable from './DataTable'
import { Breakpoint } from '@mui/material'

interface ResponsiveTableProps {
  columns: any[],
  count: number,
  data: any[],
  rowsClassArray?: any[],
  excludePrimaryFromDetails?: boolean,
  noContentText?: string,
  tableBreakpoints?: Breakpoint[],
  listBreakpoints?: Breakpoint[],
  page: number,
  rowsPerPage: number,
  showPagination: boolean,
  implementation?: "js" | "css",
  ExpansionPanelDetailsProps?: any,
  ExpansionPanelDetailsTypographyProps?: any,
  ExpansionPanelMoreIconProps?: any,
  ExpansionPanelProps?: any,
  ExpansionPanelSummaryProps?: any,
  ExpansionPanelSummaryTypographyProps?: any,
  TableBodyCellProps?: any,
  TableBodyProps?: any,
  TableBodyRowProps?: any,
  TableHeadCellProps?: any,
  TableHeadProps?: any,
  TableHeadRowProps?: any,
  TablePaginationProps?: any,
  TableProps?: any,
  enableShouldComponentUpdate?: boolean,
  onChangePage: (event: any, page: number) => void
}

class ResponsiveTable extends Component<ResponsiveTableProps> {
  handleChangePage = (event: any, page: number) => this.props.onChangePage(event, page);

  render() {
    const {
      columns,
      count,
      data,
      rowsClassArray,
      excludePrimaryFromDetails,
      noContentText,
      tableBreakpoints,
      listBreakpoints,
      page,
      rowsPerPage,
      showPagination,
      implementation,
      ExpansionPanelDetailsProps,
      ExpansionPanelDetailsTypographyProps,
      ExpansionPanelMoreIconProps,
      ExpansionPanelProps,
      ExpansionPanelSummaryProps,
      ExpansionPanelSummaryTypographyProps,
      TableBodyCellProps,
      TableBodyProps,
      TableBodyRowProps,
      TableHeadCellProps,
      TableHeadProps,
      TableHeadRowProps,
      TablePaginationProps,
      TableProps,
      enableShouldComponentUpdate,
    } = this.props;

    return (
      <div>
        {/* DESKTOP BIG TABLE */}

        <Hidden only={tableBreakpoints || ['xs', 'sm', 'md']} implementation={implementation || 'js'}>
          <DataTable
            enableShouldComponentUpdate={enableShouldComponentUpdate}
            columns={columns}
            count={count}
            data={data}
            rowsClassArray={rowsClassArray}
            noContentText={noContentText || 'No content available'}
            page={page}
            rowsPerPage={rowsPerPage}
            showPagination={showPagination}
            TableBodyCellProps={TableBodyCellProps}
            TableBodyProps={TableBodyProps}
            TableBodyRowProps={TableBodyRowProps}
            TableHeadCellProps={TableHeadCellProps}
            TableHeadProps={TableHeadProps}
            TableHeadRowProps={TableHeadRowProps}
            TablePaginationProps={TablePaginationProps}
            TableProps={TableProps}
            onChangePage={this.handleChangePage}
          />
        </Hidden>
        {/* MOBILE EXPANDABLE LIST OF CARDS */}

        <Hidden only={listBreakpoints || ['lg', 'xl']} implementation={implementation || 'js'}>
          <DataList
            enableShouldComponentUpdate={enableShouldComponentUpdate}
            columns={columns}
            count={count}
            data={data}
            rowsClassArray={rowsClassArray}
            excludePrimaryFromDetails={excludePrimaryFromDetails}
            noContentText={noContentText}
            page={page}
            rowsPerPage={rowsPerPage}
            showPagination={showPagination}
            ExpansionPanelDetailsProps={ExpansionPanelDetailsProps}
            ExpansionPanelDetailsTypographyProps={
              ExpansionPanelDetailsTypographyProps
            }
            ExpansionPanelMoreIconProps={ExpansionPanelMoreIconProps}
            ExpansionPanelProps={ExpansionPanelProps}
            ExpansionPanelSummaryProps={ExpansionPanelSummaryProps}
            ExpansionPanelSummaryTypographyProps={
              ExpansionPanelSummaryTypographyProps
            }
            TablePaginationProps={TablePaginationProps}
            onChangePage={this.handleChangePage}
          />
        </Hidden>
      </div>
    )
  }
}

export default ResponsiveTable
