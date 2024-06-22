import React, { FC, useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRecoilState } from "recoil";
import { Employee, employeesState } from "@/shared/api/state/employees";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { toast } from "@/shared/ui/use-toast";
import { addEmployee, updateEmployee } from "./employeeUtils";

const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dependents: z
    .array(z.object({ name: z.string().min(1, "Name is required") }))
    .default([{ name: "" }]),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  /**
   * Function to exit edit mode and reset the form.
   */
  onExitEditMode: VoidFunction;

  /**
   * The employee data to edit, if any. If null, the form will be in add mode.
   */
  employee?: Employee | null;
}

/**
 * EmployeeForm component for adding and editing employees.
 *
 * This component provides a form for adding and editing employees and their dependents.
 * It handles form validation using `zod` and `react-hook-form`, and manages state using Recoil.
 *
 * @param {EmployeeFormProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered component.
 */
const EmployeeForm: FC<EmployeeFormProps> = ({
  employee,
  onExitEditMode,
}: EmployeeFormProps): React.ReactElement => {
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

  useEffect(() => {
    setContainerHeight(300 + fields.length * 136);
  }, [fields.length]);

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

  const onSubmit = useCallback(
    (data: EmployeeFormData) => {
      if (employee) {
        const updatedEmployees = updateEmployee(employees, employee, data);
        setEmployees(updatedEmployees);
        toast({
          title: "Employee successfully updated!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      } else {
        const newEmployees = addEmployee(employees, data);
        setEmployees(newEmployees);
        toast({
          title: "Employee successfully added!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      }
      form.reset({
        name: "",
        dependents: [{ name: "" }],
      });
      onExitEditMode();
    },
    [employees, employee, setEmployees, form, onExitEditMode],
  );

  return (
    <div
      className={`flex-1 h-auto border overflow-y-hidden p-4 rounded shadow transition-all duration-300 ${employee ? "bg-yellow-100" : ""}`}
      style={{ maxHeight: containerHeight }}
    >
      <Form {...form}>
        <form
          id="employee-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="sticky top-0 bg-white p-4 border-b shadow-md z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {employee ? "Edit Employee" : "Add Employee"}
              </h3>
              <div className="space-x-2">
                {employee && (
                  <Button onClick={onExitEditMode}>Exit Edit Mode</Button>
                )}
                <Button type="button" onClick={() => append({ name: "" })}>
                  Add Dependent
                </Button>
                <Button type="submit" form="employee-form">
                  Save Employee
                </Button>
              </div>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Employee&apos;s full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-6 max-h-[275px] overflow-y-auto px-3 pb-4">
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                name={`dependents.${index}.name` as const}
                key={field.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dependent {index + 1} Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Dependent ${index + 1}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <Button type="button" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;