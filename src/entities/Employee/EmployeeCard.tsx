import React, { FC, memo } from "react";
import { IEmployeeCheck } from "@/shared/api/state/employees";

interface IEmployeeCard {
  employee: IEmployeeCheck;
  onClick: (employee: IEmployeeCheck) => void;
}

/**
 * EmployeeCard component for displaying employee details.
 *
 * @param {IEmployeeCard} props The component props.
 */
const EmployeeCard: FC<IEmployeeCard> = memo(
  ({ employee, onClick }: IEmployeeCard) => {
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
