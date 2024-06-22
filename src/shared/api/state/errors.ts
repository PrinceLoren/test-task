import { atom } from "recoil";

/**
 * An error that does not irrecoverably break the app flow
 */
export class RecoverableError extends Error {}
export const isRecoverableError = (e: unknown): e is RecoverableError =>
  e instanceof RecoverableError;

export const recoverableErrorState = atom<RecoverableError | null>({
  key: "recoverableError",
  default: null,
});
