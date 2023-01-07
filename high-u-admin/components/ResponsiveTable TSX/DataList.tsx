import React, { Component } from 'react'
import Grid from '@mui/material/Grid'
import _isEqual from 'lodash.isequal'

import { CellRenderer, LabelRenderer } from './Renderer'
import ExpandableListItem from './ExpandableListItem'
import NoContent from './NoContent'
import Pagination from './Pagination'



interface DataListProps {
  columns: Column[]
  count: number
  data: any[]
  excludePrimaryFromDetails?: boolean
  noContentText?: string
  page?: number
  rowsPerPage?: number
  scrollToSelected?: boolean
  scrollOptions?: ScrollIntoViewOptions
  showPagination?: boolean
  enableShouldComponentUpdate?: boolean
  rowsClassArray?: string[]
  onChangePage?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
  ExpansionPanelDetailsProps?: object
  ExpansionPanelDetailsTypographyProps?: object
  ExpansionPanelMoreIconProps?: object
  ExpansionPanelProps?: object
  ExpansionPanelSummaryProps?: object
  ExpansionPanelSummaryTypographyProps?: object
  SelectedExpansionPanelProps?: object
  TablePaginationProps?: object
}

interface Column {
  primary: boolean;
  key: string;
  label: string;
}

class DataList extends Component<DataListProps> {
  shouldComponentUpdate(nextProps: DataListProps) {
    const { enableShouldComponentUpdate, data } = this.props
    if (enableShouldComponentUpdate) {
      return !_isEqual(nextProps.data, data)
    }
    return true
  }

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) =>
    this.props.onChangePage && this.props.onChangePage(event, page)

  getRowClass = (index: number) => {
    const { rowsClassArray } = this.props
    return rowsClassArray && rowsClassArray[index] ? rowsClassArray[index] : ''
  }

  createListItemTitle = (columns: Column[], row: any, data: any[]) => {
    const primaryColumns = columns.filter(column => column.primary)
    return primaryColumns.length === 0
      ? <CellRenderer column={columns[0]} row={row} data={data} />
      : <span>{primaryColumns
        .map(column => (
          <CellRenderer key={column.key} column={column} row={row} data={data} />
        ))
        .reduce((prev, next) => [prev, ' ', next])}</span>
  }
  


  createListItemDescription = (columns: Column[], row: any, data: any[], excludePrimary: boolean) => (
    <div>
      {columns
        .filter((column) => !excludePrimary || !column.primary)
        .map((column, index) => (
          <Grid key={`${column.label}-${index}`} container>
            <Grid item xs>
            <LabelRenderer column={column} data={data} />
            </Grid>
            <Grid item xs>
              <CellRenderer column={column} row={row} data={data} />
            </Grid>
          </Grid>
        ))}
    </div>
  )

  render() {
    const {
      columns,
      count,
      data,
      excludePrimaryFromDetails,
      noContentText,
      page,
      rowsPerPage,
      scrollToSelected,
      scrollOptions,
      showPagination,
      ExpansionPanelDetailsProps,
      ExpansionPanelDetailsTypographyProps,
      ExpansionPanelMoreIconProps,
      ExpansionPanelProps,
      ExpansionPanelSummaryProps,
      ExpansionPanelSummaryTypographyProps,
      SelectedExpansionPanelProps,
      TablePaginationProps,
    } = this.props
    if (!Array.isArray(data) || data.length === 0 || !Array.isArray(columns) || columns.length === 0) {
      return <NoContent text={noContentText} />
    }

    return (
      <div>
        {data.map((row, index) => (
          <ExpandableListItem
            key={index}
            panelClass={this.getRowClass(index)}
            summary={this.createListItemTitle(columns, row, data)}
            details={this.createListItemDescription(columns, row, data, excludePrimaryFromDetails)}
            selected={row.selected}
            scrollToSelected={scrollToSelected}
            scrollOptions={scrollOptions}
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
            SelectedExpansionPanelProps={SelectedExpansionPanelProps}
          />
        ))}
        {showPagination && (
          <Pagination
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            TablePaginationProps={TablePaginationProps}
            onChangePage={this.handleChangePage}
          />
        )}
      </div>
    )
  }
}


