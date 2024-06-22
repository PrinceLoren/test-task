import { IEmployee } from "@/entities/Employee/IEmployee";

/**
 * Calculates the cost of benefits for an employee, adjusted for any discounts
 * based on the employee's and dependents' names. The cost is returned on a
 * per-paycheck basis.
 *
 * @param {IEmployee} employee - The employee object containing the name of the
 * employee and a list of dependents.
 * @returns {number} The cost of benefits per paycheck for the given employee.
 *
 * Calculation breakdown:
 * - The cost of benefits is $1000/year for each employee.
 * - Each dependent (children and possibly spouses) incurs a cost of $500/year.
 * - Anyone whose name starts with ‘A’ gets a 10% discount, employee or dependent.
 * - All employees are paid $2000 per paycheck before deductions.
 * - There are 26 paychecks in a year.
 */
export const calculateBenefits = (employee: IEmployee): number => {
  // Base cost of benefits for each employee per year
  const baseCost = 1000;
  // Cost of benefits for each dependent per year
  const dependentCost = 500;
  // Discount rate for names starting with 'A' (10% discount)
  const discountRate = 0.9;
  // Initialize total cost with the base cost for the employee
  let totalCost = baseCost;

  // Apply discount if employee's name starts with 'A'
  if (employee.name.startsWith("A")) {
    totalCost *= discountRate;
  }

  // Calculate cost for each dependent
  employee.dependents.forEach((dep) => {
    let depCost = dependentCost;
    if (dep.name.startsWith("A")) {
      depCost *= discountRate;
    }
    totalCost += depCost;
  });

  // Return cost per paycheck (26 paychecks per year)
  return totalCost / 26;
};
