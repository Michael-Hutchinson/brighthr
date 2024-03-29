import { Absence, AbsenceWithConflict } from '@/types/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import formatAbsenceType from '../helpers/formatAbsenseType';
import formatDate from '../helpers/formatDate';

const fetchAbsences = async (): Promise<Absence[]> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BRIGHTHR_API_URL + 'absences'
    );
    if (!response.ok) {
      throw new Error(
        `Fetching absences failed with status: ${response.status}`
      );
    }
    const absences: Absence[] = await response.json();
    return absences.map((absence) => ({
      ...absence,
      absenceType: formatAbsenceType(absence.absenceType),
    }));
  } catch (error) {
    console.error('Error fetching absences:', error);
    throw new Error('Error fetching absences');
  }
};

const fetchAbsenceConflicts = async (absenceId: string): Promise<boolean> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BRIGHTHR_API_URL + 'conflict/' + absenceId
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
