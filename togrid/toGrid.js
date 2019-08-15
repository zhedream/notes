class toGrid {

    constructor(id = 'gridID', columnDefs, rowData) {
        this.columnDefs = columnDefs;
        this.rowData = rowData;
        let gridDiv;
        console.log('#' + id);
        gridDiv = document.querySelector('#' + id);
        this.gridOptions = this.setTable(gridDiv); // 初始化表格
    }

    setTable(gridDiv) {
        const gridOptions = {
            components: {
                loadingRenderer: (params) => {
                    if (params.value !== undefined) return params.value;
                    else return `<img src='https://www.ag-grid.com/images/loading.gif'>`;
                }
            },
            columnDefs: this.columnDefs,
            rowData: this.rowData,
            enableFilter: true,
            enableSorting: true,
            enableRangeSelection: true,
            rowSelection: 'multiple',
            rowGroupPanelShow: 'always',
            defaultColDef: {
                editable: false,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true
            },
            onGridReady: (params) => {
                params.api.sizeColumnsToFit();
            },
            localeText: ag_localeText
        };
        const l = new agGrid.Grid(gridDiv, gridOptions);
        this.gridOptions = gridOptions;
    }

    setRowData(rowData){
        this.gridOptions.api.setRowData(rowData);       
    }

    setColumnDefs(columnDefs){
        this.gridOptions.api.setColumnDefs(columnDefs);
    }


}