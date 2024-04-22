import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/app/components/molecules/button';
import { Input } from '@/app/components/atoms/input';
import { DataTableViewOptions } from '@/app/components/molecules/data-table-view-options';

import {
    statuses,
    kingdoms,
    iucnCategories,
} from '../../nucleus/data/biodiversity-data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered =
        table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search by common name..."
                    value={
                        (table
                            .getColumn('speciesCommonName')
                            ?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('speciesCommonName')
                            ?.setFilterValue(
                                event.target.value,
                            )
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {/* {table.getColumn('IUCNCategoryName') && (
                    <DataTableFacetedFilter
                        column={table.getColumn(
                            'IUCNCategoryName',
                        )}
                        title="IUCN Category Name"
                        options={iucnCategories}
                    />
                )} */}
                {/* {table.getColumn('status') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('status')}
                        title="Status"
                        options={statuses}
                    />
                )} */}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            table.resetColumnFilters()
                        }
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {/* <DataTableViewOptions table={table} /> */}
        </div>
    );
}
