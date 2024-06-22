import React, { FC } from "react";
import EmployeeList from "@/entities/Employee/EmployeeList";

const EmployeesScreen: FC = () => {
  return (
    <div className="w-full">
      <h1>Employees</h1>
      <EmployeeList />
    </div>
  );
};

export default EmployeesScreen;
