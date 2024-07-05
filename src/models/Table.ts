export interface Table {
  type: "Table";
  columns: Column[];
  rows: TableRow[];
}

export interface Column {
  width: number;
}

export interface TableRow {
  type: "TableRow";
  cells: TableCell[];
}

export interface TableCell {
  type: "TableCell";
  items: TextBlock[];
  style?: TableCellStyle;
}

export type TableCellStyle = "attention" | "good" | "warning";

export interface TextBlock {
  type: "TextBlock";
  text: string;
  wrap?: boolean;
  isSubtle?: boolean;
  weight?: "Bolder";
}
