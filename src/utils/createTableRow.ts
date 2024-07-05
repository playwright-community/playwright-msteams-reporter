import { TableCellStyle, TableRow } from "../models";

export const createTableRow = (
  type: string,
  total: string | number,
  options?: {
    style?: TableCellStyle;
    isSubtle?: boolean;
    weight?: "Bolder";
  }
): TableRow => {
  const row: TableRow = {
    type: "TableRow",
    cells: [
      {
        type: "TableCell",
        items: [
          {
            type: "TextBlock",
            text: type,
            wrap: true,
          },
        ],
        style: options?.style || undefined,
      },
      {
        type: "TableCell",
        items: [
          {
            type: "TextBlock",
            text: `${total}`,
            wrap: true,
          },
        ],
      },
    ],
  };

  if (options?.style) {
    row.cells[0].style = options.style;
  }

  if (options?.isSubtle) {
    row.cells[0].items[0].isSubtle = options?.isSubtle;
    row.cells[1].items[0].isSubtle = options?.isSubtle;
  }

  if (options?.weight) {
    row.cells[0].items[0].weight = options.weight;
    row.cells[1].items[0].weight = options.weight;
  }

  return row;
};
