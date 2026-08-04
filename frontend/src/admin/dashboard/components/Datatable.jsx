import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import "./components.css";

export default function DataTable({
    columns,
    data,
    emptyMessage = "No data available.",
}) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (

        <div className="ui-table-wrapper">

            <table className="ui-table">

                <thead>

                    {table.getHeaderGroups().map(headerGroup => (

                        <tr key={headerGroup.id}>

                            {headerGroup.headers.map(header => (

                                <th key={header.id}>

                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                </th>

                            ))}

                        </tr>

                    ))}

                </thead>

                <tbody>

                    {table.getRowModel().rows.length > 0 ? (

                        table.getRowModel().rows.map(row => (

                            <tr key={row.id}>

                                {row.getVisibleCells().map(cell => (

                                    <td key={cell.id}>

                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}

                                    </td>

                                ))}

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={columns.length}
                                className="ui-table-empty"
                            >

                                {emptyMessage}

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}