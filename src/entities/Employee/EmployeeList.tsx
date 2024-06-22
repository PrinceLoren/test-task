import React, { useCallback, useMemo, useState } from "react";
import { Employee } from "@/shared/api/state/employees";
import EmployeeForm from "./EmployeeForm";
import { calculateBenefits } from "./calculatedBenefits";
import { FullSizeSpinner } from "@/shared/ui/loading";
import { useEmployees } from "@/shared/hooks/useEmployees";
import EmployeeCard from "./EmployeeCard";

/**
 * EmployeeList component for displaying and managing employees.
 */
const EmployeeList: React.FC = () => {
  const { employees, isInitialLoading, isEmployeesLoading } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  const totalCosts = useMemo(() => {
    return employees.map((employee) => ({
      ...employee,
      costPerPaycheck: calculateBenefits(employee),
    }));
  }, [employees]);

  const handleEmployeeClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
  }, []);

  const handleExitEditMode = useCallback(() => {
    setSelectedEmployee(null);
  }, []);

  if (isInitialLoading) {
    return <FullSizeSpinner />;
  }

  return (
    <div className="flex p-4 w-full align-top space-x-10">
      <div className="w-1/3 flex flex-col space-y-6 max-h-[505px] overflow-y-scroll">
        {isEmployeesLoading ? (
          <FullSizeSpinner />
        ) : (
          totalCosts.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleEmployeeClick(employee)}
            />
          ))
        )}
      </div>
      <EmployeeForm
        employee={selectedEmployee}
        onExitEditMode={handleExitEditMode}
      />
    </div>
  );
};

export default EmployeeList;
