import { EmployeeFormData } from "./EmployeeForm";
import { Employee } from "@/shared/api/state/employees";

/**
 * Updates an existing employee in the employees array.
 *
 * @param employees - The array of current employees.
 * @param employee - The employee to be updated.
 * @param data - The new data for the employee.
 * @returns The updated array of employees.
 */
export const updateEmployee = (
  employees: Employee[],
  employee: Employee,
  data: EmployeeFormData,
): Employee[] => {
  return employees.map((emp) =>
    emp.id === employee.id
      ? {
          ...emp,
          name: data.name,
          dependents: data.dependents.map((dep, index) => ({
            id: emp.dependents[index]?.id ?? index + 1,
            name: dep.name,
          })),
        }
      : emp,
  );
};

/**
 * Adds a new employee to the employees array.
 *
 * @param employees - The array of current employees.
 * @param data - The data for the new employee.
 * @returns The updated array of employees with the new employee added.
 */
export const addEmployee = (
  employees: Employee[],
  data: EmployeeFormData,
): Employee[] => {
  const newEmployee = {
    id: employees.length + 1,
    name: data.name,
    dependents: data.dependents.map((dep, index) => ({
      id: index + 1,
      name: dep.name,
    })),
  };
  return [...employees, newEmployee];
};
