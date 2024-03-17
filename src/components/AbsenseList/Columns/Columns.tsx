'use client';

import calculateEndDate from '@/app/helpers/calculateEndDate';
import formatDate from '@/app/helpers/formatDate';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AbsenceWithConflict } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';
import { MdErrorOutline } from 'react-icons/md';

const columns = (
  setEmployeeId: Dispatch<SetStateAction<string | null>>
): ColumnDef<AbsenceWithConflict>[] => [
  {
    accessorFn: (row) => `${row.employee.firstName} ${row.employee.lastName}`,
    id: 'fullName',
    accessorKey: 'employeeName',
    cell: ({ row }) => (
      <Button
        variant='ghost'
        className='cursor-pointer'
        onClick={() => setEmployeeId(row.original.employee.id)}
      >
        {row.original.employee.firstName} {row.original.employee.lastName}
      </Button>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Employee Name
          <LuArrowDownUp className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    id: 'endDate',
    cell: (info) =>
      formatDate(
        calculateEndDate(info.row.original.startDate, info.row.original.days)
      ),
  },
  {
    accessorKey: 'absenceType',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Absence Type
          <LuArrowDownUp className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    cell: (info) => {
      const isApproved = info.row.original.approved;
      return (
        <div
          className={`px-2 py-1 text-white font-semibold rounded ${
            isApproved ? 'bg-green-500' : 'bg-yellow-500'
          }`}
        >
          {isApproved ? 'Approved' : 'Pending Approval'}
        </div>
      );
    },
  },
  {
    accessorKey: 'conflicts',
    id: 'conflicts',
    header: 'Conflicts',
    cell: (info) => {
      const hasConflicts = info.row.original.conflicts;
      return hasConflicts ? (
        <div className='flex justify-center'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdErrorOutline className='text-red-500' size={20} />
              </TooltipTrigger>
              <TooltipContent>
                <p>This employee has conflicts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : null;
    },
  },
];

export default columns;
