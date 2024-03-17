import { useAbsencesWithConflicts } from '@/app/hooks/useAbsences';
import columns from './Columns/Columns';
import DataTable from './DataTable/DataTable';
import { useState } from 'react';
import { Button } from '../ui/button';

const AbsenceList = () => {
  const [employeeId, setEmployeeId] = useState<string | null>('');

  const getColumns = columns(setEmployeeId);

  const { data: absences, isLoading, error } = useAbsencesWithConflicts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <DataTable
        columns={getColumns}
        data={absences ?? []}
        employeeId={employeeId}
      />
      <div>
        {employeeId && (
          <Button onClick={() => setEmployeeId('')}>Clear Filter</Button>
        )}
      </div>
    </>
  );
};

export default AbsenceList;
