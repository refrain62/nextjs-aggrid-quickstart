"use client"

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// 行データの定義
interface RowData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

// クリックボタン
const CustomButtonComponent = () => {
  return (
    <button
      style={{ border: '1px solid #999' }}
      onClick={() => window.alert('clicked')}>
        Push Me!
      </button>
  )
}


export const Grid = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
  const [gridColumnApi, setGridColumnApi] = useState<agGrid.ColumnApi | null>(
    null
  );

  // データ取得
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, []);

  // 列定義
  const columnDefs: agGrid.ColDef[] = [
    { field: "athlete", filter: "agTextColumnFilter" },
    { field: "age", filter: "agNumberColumnFilter" },
    { field: "country", filter: "agSetColumnFilter" },
    { field: "year", filter: "agNumberColumnFilter" },
    { field: "date", filter: "agDateColumnFilter" },
    { field: "sport", filter: "agTextColumnFilter" },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
    { field: "total", filter: "agNumberColumnFilter" },
    { field: 'button', cellRenderer: CustomButtonComponent }
  ];

  const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  // grid が readyになったら
  const onGridReady = (params: agGrid.GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // ページネーション変更時
  const onPaginationChanged = () => {
    console.log("onPaginationChanged");
  };

  // フィルターのクリア処理
  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  };

  return (
    <div className="ag-theme-alpine grid-container">
      {/* フィルタークリアボタン */}
      <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563] ">
        <button
          className="rounded bg-gray-200 px-3 py-1"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/** Grid表示 */}
      <AgGridReact
        className="ag-grid"
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={50}
        onPaginationChanged={onPaginationChanged}
      ></AgGridReact>

      <style jsx global>{`
        .grid-container {
          height: 800px;
          width: 100%;
        }
        .ag-grid .ag-cell {
          padding: 0.5rem;
          font-size: 1.2rem;
          color: #4b5563;
          border-color: #e5e7eb;
          line-height: 1.5;
        }
        .ag-grid .ag-header-cell {
          font-weight: 600;
          font-size: 1.2rem;
          color: #374151;
          background-color: #f9fafb;
          border-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};
