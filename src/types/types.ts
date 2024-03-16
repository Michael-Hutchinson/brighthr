export interface Employee {
  firstName: string;
  lastName: string;
  id: string;
}

export interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: string;
  employee: Employee;
  approved: boolean;
}

export interface AbsenceWithConflict extends Absence {
  conflicts: boolean;
}
