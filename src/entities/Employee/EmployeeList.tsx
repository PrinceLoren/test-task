import React from "react";
import EmployeeForm from "./EmployeeForm";
import { FullSizeSpinner } from "@/shared/ui/loading";
import EmployeeCard from "./EmployeeCard";
import { useEmployeeList } from "@/shared/hooks/useEmployeeList";

/**
 * EmployeeList component for displaying and managing employees.
 */
const EmployeeList: React.FC = () => {
  const {
    isInitialLoading,
    isEmployeesLoading,
    selectedEmployee,
    totalCosts,
    handleEmployeeClick,
    handleExitEditMode,
  } = useEmployeeList();

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
