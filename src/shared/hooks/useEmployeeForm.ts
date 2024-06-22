import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRecoilState } from "recoil";
import { employeesState, IEmployee } from "@/shared/api/state/employees";
import { addEmployee, updateEmployee } from "@/entities/Employee/employeeUtils";

/**
 * Schema for validating employee form data using zod.
 */
const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dependents: z
    .array(z.object({ name: z.string().min(1, "Name is required") }))
    .default([{ name: "" }]),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

interface IUseEmployeeFormReturn {
  form: UseFormReturn<EmployeeFormData>;
  fields: { id: string }[];
  append: (value: { name: string }) => void;
  remove: (index: number) => void;
  containerHeight: number;
  onSubmit: (data: EmployeeFormData) => void;
}

/**
 * Custom hook for managing employee form state and logic.
 *
 * @param {IEmployee | null} employee - The employee data to edit, if any.
 * @param {VoidFunction} [onExitEditMode] - Function to exit edit mode and reset the form.
 * @returns {IUseEmployeeFormReturn} The form state and handlers.
 */
export const useEmployeeForm = (
  employee?: IEmployee | null,
  onExitEditMode?: VoidFunction,
): IUseEmployeeFormReturn => {
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [containerHeight, setContainerHeight] = useState(450);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee || {
      name: "",
      dependents: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dependents",
  });

  // Adjust container height based on the number of dependents
  useEffect(() => {
    setContainerHeight(300 + fields.length * 136);
  }, [fields.length]);

  // Reset form when employee changes
  useEffect(() => {
    if (employee) {
      form.reset(employee);
    } else {
      form.reset({
        name: "",
        dependents: [{ name: "" }],
      });
    }
  }, [employee, form]);

  // Handle form submission
  const onSubmit = useCallback(
    (data: EmployeeFormData) => {
      if (employee) {
        const updatedEmployees = updateEmployee(employees, employee, data);
        setEmployees(updatedEmployees);
      } else {
        const newEmployees = addEmployee(employees, data);
        setEmployees(newEmployees);
      }
      form.reset({
        name: "",
        dependents: [{ name: "" }],
      });
      onExitEditMode?.();
    },
    [employees, employee, setEmployees, form, onExitEditMode],
  );

  return {
    form,
    fields,
    append,
    remove,
    containerHeight,
    onSubmit,
  };
};
