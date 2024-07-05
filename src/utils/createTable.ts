import { Table } from "../models";

export const createTable = (): Table => ({
  type: "Table",
  columns: [
    {
      width: 2,
    },
    {
      width: 1,
    },
  ],
  rows: [],
});
