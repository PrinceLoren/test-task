import React, { memo } from "react";
import { EmployeeCheck } from "@/shared/api/state/employees";

interface EmployeeCardProps {
  employee: EmployeeCheck;
  onClick: (employee: EmployeeCheck) => void;
}

/**
 * EmployeeCard component for displaying employee details.
 *
 * @param {EmployeeCardProps} props The component props.
 */
const EmployeeCard: React.FC<EmployeeCardProps> = memo(
  ({ employee, onClick }: EmployeeCardProps) => {
    return (
      <div
        className="border p-4 rounded shadow cursor-pointer"
        onClick={() => onClick(employee)}
      >
        <h2 className="text-xl font-semibold">{employee.name}</h2>
        <p className="text-gray-600">
          Cost per paycheck: ${employee.costPerPaycheck.toFixed(2)}
        </p>
        <ul className="list-disc ml-5">
          {employee.dependents.map((dep) => (
            <li key={dep.id}>{dep.name}</li>
          ))}
        </ul>
      </div>
    );
  },
);

export default EmployeeCard;
