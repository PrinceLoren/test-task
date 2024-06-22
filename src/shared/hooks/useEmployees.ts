import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Employee, employeesState } from "@/shared/api/state/employees";
import { fetchEmployees } from "@/shared/api/employeeAPI";

interface IUseEmployeesResult {
  employees: Employee[]; // The list of employees
  isInitialLoading: boolean; // Flag indicating initial loading state
  isEmployeesLoading: boolean; // Flag indicating employees loading state
  setEmployees: (employees: Employee[]) => void; // Function to set the employees state
}
/**
 * Custom hook for managing employees state and loading states.
 *
 * @returns {IUseEmployeesResult} The state and functions for managing employees.
 */
export const useEmployees = (): IUseEmployeesResult => {
  const [employees, setEmployees] = useRecoilState<Employee[]>(employeesState);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isEmployeesLoading, setIsEmployeesLoading] = useState(false);

  useEffect(() => {
    if (employees.length === 0) {
      fetchEmployees().then((employees) => {
        setEmployees(employees);
        setIsInitialLoading(false);
      });
    } else {
      setIsInitialLoading(false);
    }
  }, [setEmployees, employees.length]);

  useEffect(() => {
    if (!isInitialLoading) {
      setIsEmployeesLoading(true);
      const timer = setTimeout(() => {
        setIsEmployeesLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [employees, isInitialLoading]);

  return {
    employees,
    isInitialLoading,
    isEmployeesLoading,
    setEmployees,
  };
};
