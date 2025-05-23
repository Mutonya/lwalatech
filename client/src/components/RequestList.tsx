import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { CommodityRequest } from '../interfaces/commodity';

interface RequestListProps {
    requests: CommodityRequest[];
    chaId: string;
    onStatusChange: (requestId: number, status: 'approved' | 'rejected') => void;
    loading?: boolean;
}

const RequestList: React.FC<RequestListProps> = ({
                                                     requests,
                                                     chaId,
                                                     onStatusChange,
                                                     loading = false,
                                                 }) => {
    const columns: ColumnDef<CommodityRequest>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 70,
        },
        {
            header: 'CHW',
            accessorFn: (row) => row.chw?.name || 'Unknown',
            size: 150,
        },
        {
            header: 'Commodity',
            accessorFn: (row) => row.commodity?.name || 'Unknown',
            size: 150,
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            size: 100,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 120,
            cell: ({ getValue }) => {
                const status = getValue() as string;
                return (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                    }`}>
            {status}
          </span>
                );
            },
        },
        {
            header: 'Request Date',
            accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
            size: 150,
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => onStatusChange(row.original.id, 'approved')}
                        disabled={row.original.status !== 'pending'}
                        className={`p-1 rounded ${
                            row.original.status !== 'pending'
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-green-600 hover:bg-green-50'
                        }`}
                    >
                        <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onStatusChange(row.original.id, 'rejected')}
                        disabled={row.original.status !== 'pending'}
                        className={`p-1 rounded ${
                            row.original.status !== 'pending'
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-red-600 hover:bg-red-50'
                        }`}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: requests,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-4">
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    style={{ width: header.getSize() }}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <span className="text-sm text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
        </span>
            </div>
        </div>
    );
};

export default RequestList;