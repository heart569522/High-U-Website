interface CellRendererProps {
  column: any;
  row: any;
  data: any;
}

export const CellRenderer: React.FC<CellRendererProps> = ({ column, row, data }) =>
(
  column.render
    ? column.render(row[column.key], row, data)
    : row[column.key]
)

interface LabelRendererProps {
  column: any;
  data: any;
}

export const LabelRenderer: React.FC<LabelRendererProps> = ({ column, data }) =>
(
  column.renderLabel
    ? column.renderLabel(column, data)
    : column.label.toUpperCase()
)