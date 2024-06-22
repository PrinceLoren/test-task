import { toast } from "@/shared/ui/use-toast";
import { EmployeeFormData } from "@/shared/hooks/useEmployeeForm";

/**
 * Displays a toast notification for a successfully added employee.
 *
 * @param {EmployeeFormData} data - The data of the newly added employee.
 */
export const showAddToast = (data: EmployeeFormData) => {
  toast({
    title: "Employee successfully added!",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
};

/**
 * Displays a toast notification for a successfully updated employee.
 *
 * @param {EmployeeFormData} data - The data of the updated employee.
 */
export const showUpdateToast = (data: EmployeeFormData) => {
  toast({
    title: "Employee successfully updated!",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
};
