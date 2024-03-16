import { Absence, AbsenceWithConflict } from '@/types/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const fetchAbsences = async (): Promise<Absence[]> => {
  try {
    const response = await fetch(
      'https://front-end-kata.brighthr.workers.dev/api/absences'
    );
    if (!response.ok) {
      throw new Error(
        `Fetching absences failed with status: ${response.status}`
      );
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching absences:', error);
    throw new Error('Error fetching absences');
  }
};

const fetchAbsenceConflicts = async (absenceId: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://front-end-kata.brighthr.workers.dev/api/conflict/${absenceId}`
    );
    if (!response.ok) {
      throw new Error(
        `Fetching absence conflicts failed with status: ${response.status}`
      );
    }
    const data = await response.json();
    return data.conflicts;
  } catch (error) {
    console.error(
      `Error fetching conflicts for absence ID ${absenceId}:`,
      error
    );
    throw new Error('Error fetching absence conflicts');
  }
};

const fetchAbsencesWithConflicts = async (): Promise<AbsenceWithConflict[]> => {
  const absences = await fetchAbsences();
  const absencesWithConflicts = await Promise.all(
    absences.map(async (absence) => {
      const conflicts = await fetchAbsenceConflicts(absence.id.toString());
      return { ...absence, conflicts };
    })
  );
  return absencesWithConflicts;
};

export const useAbsencesWithConflicts = (): UseQueryResult<
  AbsenceWithConflict[],
  Error
> => {
  return useQuery<AbsenceWithConflict[], Error>({
    queryKey: ['absencesWithConflicts'],
    queryFn: fetchAbsencesWithConflicts,
  });
};
