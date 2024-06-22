import { Employee } from "@/entities/Employee/Employee";

const mockEmployees: Employee[] = [
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

export const fetchEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEmployees), 500);
  });
};
