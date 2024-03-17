import { useAbsencesWithConflicts } from '@/app/hooks/useAbsences';
import columns from './Columns/Columns';
import DataTable from './DataTable/DataTable';

const AbsenceList = () => {
  const { data: absences, isLoading, error } = useAbsencesWithConflicts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return <DataTable columns={columns} data={absences ?? []} />;
};

export default AbsenceList;
