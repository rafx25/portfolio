// Numbers a hiring manager can read in two seconds. Every one of these has to
// be something you can back up in an interview.
export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "5+", label: "years building web systems" },
  { value: "~500", label: "employees on the HRIS" },
  { value: "6", label: "field offices using it" },
  { value: "8", label: "systems in production" },
];
