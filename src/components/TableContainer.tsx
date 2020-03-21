import React from "react";
import { useAxios } from "../model/useAxios";
import SortableTable from "./SortableTable";

const TableContainer = () => {
  const { data, loading, error } = useAxios(
    "https://programming-quotes-api.herokuapp.com/quotes"
  );

  return data ? (
    <SortableTable quotes={data}></SortableTable>
  ) : loading ? (
    <div>loading...</div>
  ) : (
    <div>{error}</div>
  );
};

export default TableContainer;
