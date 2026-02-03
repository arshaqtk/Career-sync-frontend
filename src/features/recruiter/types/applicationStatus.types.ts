export const APPLICATION_STATUS = {
  PENDING: "Pending",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  INTERVIEW: "Interview",
  SELECTED:"Selected"
} as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];


export const SELECTED_OR_REJECTED={
   REJECTED: "Rejected",
   SELECTED:"Selected"
}as const


export type SelectedOrRejected =
  (typeof SELECTED_OR_REJECTED)[keyof typeof SELECTED_OR_REJECTED];