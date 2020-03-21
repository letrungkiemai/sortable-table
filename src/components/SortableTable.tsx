import React, { useState, useMemo } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  width: 1720px;

  caption {
    margin-bottom: 20px;
  }

  table {
    margin-top: 20px;
    margin-left: 20px;
    border: 1px solid black;
    width: 100%;
    border-spacing: 0;
  }

  th,
  td {
    width: 200px;
    border: 1px solid black;

    &:nth-child(2) {
      width: 500px;
    }
    &:last-child {
      width: 600px;
    }
  }

  thead > tr {
    position: relative;
    display: block;
  }

  thead button.ascending::after {
    content: "👇";
    display: inline-block;
    margin-left: 1em;
  }

  thead button.descending::after {
    content: "☝️";
    display: inline-block;
    margin-left: 1em;
  }

  th > button {
    outline: none;
    background-color: transparent;
    border: none;
    width: 100%;

    &:active {
    }
  }

  tbody {
    display: block;
    height: auto;
    overflow: auto;
  }

  tbody > tr {
    display: block;
  }
`;

/** CUSTOM HOOK */
const useSortableData = (data, config = null) => {
  const [sortConfig, setSortConfig] = useState<any>(config);
  const sortedItems = useMemo(() => {
    let sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
        if (!a[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (!b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;

        if (a[sortConfig.key]?.toString() < b[sortConfig.key]?.toString()) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key]?.toString() > b[sortConfig.key]?.toString()) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedData;
  }, [data, sortConfig]);

  const requestSort = key => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { data: sortedItems, requestSort, sortConfig };
};

const SortableTable = ({ quotes }) => {
  const { data, requestSort, sortConfig } = useSortableData(quotes);

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const table = (
    <StyledTable>
      <table>
        <caption>Programming quotes</caption>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("author")}
                className={getClassNamesFor("author")}
              >
                Author
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("en")}
                className={getClassNamesFor("en")}
              >
                Quotes
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("numberOfVotes")}
                className={getClassNamesFor("numberOfVotes")}
              >
                Votes
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("rating")}
                className={getClassNamesFor("rating")}
              >
                Ratings
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("source")}
                className={getClassNamesFor("source")}
              >
                Source
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((p: any, i: number) => (
            <tr key={i}>
              <td>{p.author}</td>
              <td>{p.en}</td>
              <td>{p.numberOfVotes}</td>
              <td>{p.rating}</td>
              <td>{p.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );

  return table;
};

export default SortableTable;
