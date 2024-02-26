import React from 'react'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const Table = ({data, columns, ...rest}) => {
   
    return (
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            showCellVerticalBorder
            showColumnVerticalBorder
            pageSizeOptions={[5, 10, 50, 100]}
            rowSelection={false}
            {...rest}
        />
    )
}

export default React.memo(Table)