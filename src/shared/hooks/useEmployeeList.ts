import { useCallback, useMemo, useState } from "react";
import { IEmployee } from "@/shared/api/state/employees";
import { calculateBenefits } from "@/entities/Employee/calculatedBenefits";
import { useEmployees } from "@/shared/hooks/useEmployees";

/**
 * Return value type of the useEmployeeList hook.
 */
interface IUseEmployeeListReturn {
  employees: IEmployee[];
  isInitialLoading: boolean;
  isEmployeesLoading: boolean;
  selectedEmployee: IEmployee | null;
  totalCosts: Array<IEmployee & { costPerPaycheck: number }>;
  handleEmployeeClick: (employee: IEmployee) => void;
  handleExitEditMode: () => void;
}

/**
 * Custom hook for managing the employee list logic.
 *
 * @returns {IUseEmployeeListReturn} The employee list state and handlers.
 */
export const useEmployeeList = (): IUseEmployeeListReturn => {
  const { employees, isInitialLoading, isEmployeesLoading } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null,
  );

  // Calculate total costs per paycheck for each employee
  const totalCosts = useMemo(() => {
    return employees.map((employee) => ({
      ...employee,
      costPerPaycheck: calculateBenefits(employee),
    }));
  }, [employees]);

  // Handle employee card click to select employee
  const handleEmployeeClick = useCallback((employee: IEmployee) => {
    setSelectedEmployee(employee);
  }, []);

  // Handle exit edit mode
  const handleExitEditMode = useCallback(() => {
    setSelectedEmployee(null);
  }, []);

  return {
    employees,
    isInitialLoading,
    isEmployeesLoading,
    selectedEmployee,
    totalCosts,
    handleEmployeeClick,
    handleExitEditMode,
  };
};
