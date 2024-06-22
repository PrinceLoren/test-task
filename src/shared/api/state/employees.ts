import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface Dependent {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  dependents: Dependent[];
}

export interface EmployeeCheck extends Employee {
  costPerPaycheck: number;
}

const { persistAtom } = recoilPersist();

export const employeesState = atom<Employee[]>({
  key: "employeesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
