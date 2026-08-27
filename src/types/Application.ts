export type ApplicationStatus =
  | 'Interested'
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export interface Application {
  id: number;
  company: string;
  position: string;
  location: string;
  dateApplied: string;
  deadline: string;
  status: ApplicationStatus;
  jobUrl: string;
  notes: string;
}