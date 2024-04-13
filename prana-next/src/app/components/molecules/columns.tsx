import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/app/components/molecules/badge';
import { Checkbox } from '@/app/components/molecules/checkbox';

import {
    labels,
    statuses,
    kingdoms,
} from '@/app/nucleus/data/biodiversity-data/data';
import { CountrySpecies } from '@/app/nucleus/data/biodiversity-data/schema';
import { DataTableColumnHeader } from '@/app/components/molecules/data-table-column-header';
import { DataTableRowActions } from '@/app/components/molecules/data-table-row-actions';

export const columns: ColumnDef<CountrySpecies>[] = [
    //  {
    //      id: 'select',
    //      header: ({ table }) => (
    //          <>
    //              <Checkbox
    //                  checked={table.getIsAllPageRowsSelected()}
    //                  onCheckedChange={(value) =>
    //                      table.toggleAllPageRowsSelected(
    //                          !!value,
    //                      )
    //                  }
    //                  aria-label="Select all"
    //                  className="translate-y-[2px]"
    //              />
    //          </>
    //      ),
    //      cell: ({ row }) => (
    //          <>
    //              <Checkbox
    //                  checked={row.getIsSelected()}
    //                  onCheckedChange={(value) =>
    //                      row.toggleSelected(!!value)
    //                  }
    //                  aria-label="Select row"
    //                  className="translate-y-[2px]"
    //              />
    //          </>
    //      ),
    //      enableSorting: false,
    //      enableHiding: false,
    //  },
    {
        accessorKey: 'speciesCommonName',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Common Name"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.getValue('speciesCommonName')}
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'speciesBinomialName',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Binomial"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.getValue('speciesBinomialName')}
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'speciesGroup',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Group"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {(
                    row.getValue('speciesGroup') as string
                ).replace(/_/g, ' ')}
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'IUCNCategoryName',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="IUCN Category"
            />
        ),
        cell: ({ row }) => {
            const label = labels.find(
                (label) =>
                    label.value ===
                    row.original.IUCNCategoryName,
            );

            return (
                <div className="flex space-x-2">
                    {label && (
                        <Badge variant="outline">
                            {label.label}
                        </Badge>
                    )}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('IUCNCategoryName')}
                    </span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'countryHabitatRangeArea',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Country Habitat Area (sq. km.)"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {Math.floor(
                    Number(
                        row.getValue(
                            'countryHabitatRangeArea',
                        ),
                    ),
                ).toLocaleString()}
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'countryHabitatRangeAreaPct',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Country Habitat Area (%)"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {row.getValue('countryHabitatRangeAreaPct')}
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'totalHabitatRangeArea',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Total Habitat Area (sq. km.)"
            />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">
                {Math.floor(
                    Number(
                        row.getValue(
                            'totalHabitatRangeArea',
                        ),
                    ),
                ).toLocaleString()}
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    //  {
    //      accessorKey: 'kingdom',
    //      header: ({ column }) => (
    //          <DataTableColumnHeader
    //              column={column}
    //              title="Taxonomy"
    //          />
    //      ),
    //      cell: ({ row }) => {
    //          const kingdom = kingdoms.find(
    //              (kingdom) =>
    //                  kingdom.value ===
    //                  row.getValue('kingdom'),
    //          );

    //          if (!kingdom) {
    //              return null;
    //          }

    //          return (
    //              <div className="flex w-[100px] items-center">
    //                  {kingdom.icon && (
    //                      <kingdom.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //                  )}
    //                  <span>{kingdom.label}</span>
    //              </div>
    //          );
    //      },
    //      filterFn: (row, id, value) => {
    //          return value.includes(row.getValue(id));
    //      },
    //  },
    //  {
    //      accessorKey: 'status',
    //      header: ({ column }) => (
    //          <DataTableColumnHeader
    //              column={column}
    //              title="Status"
    //          />
    //      ),
    //      cell: ({ row }) => {
    //          const status = statuses.find(
    //              (status) =>
    //                  status.value === row.getValue('status'),
    //          );

    //          if (!status) {
    //              return null;
    //          }

    //          return (
    //              <div className="flex items-center">
    //                  {status.icon && (
    //                      <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //                  )}
    //                  <span>{status.label}</span>
    //              </div>
    //          );
    //      },
    //      filterFn: (row, id, value) => {
    //          return value.includes(row.getValue(id));
    //      },
    //  },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions row={row} />
        ),
    },
];
