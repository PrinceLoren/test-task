import { IEmployee } from "@/entities/Employee/IEmployee";

const mockEmployees: IEmployee[] = [
  {
    id: 1,
    name: "Alice",
    dependents: [
      { id: 1, name: "Bob" },
      { id: 2, name: "Ivan" },
    ],
  },
  {
    id: 2,
    name: "John",
    dependents: [{ id: 2, name: "Anna" }],
  },
];

export const fetchEmployees = (): Promise<IEmployee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEmployees), 500);
  });
};
