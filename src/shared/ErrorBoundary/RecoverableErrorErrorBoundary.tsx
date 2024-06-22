import { FC, PropsWithChildren } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { recoverableErrorState } from "@/shared/api";

const RecoverableErrorDialog: FC = () => {
  const recoverableError = useRecoilValue(recoverableErrorState);
  const resetRecoverableError = useResetRecoilState(recoverableErrorState);

  return recoverableError ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            An error occurred
          </h3>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600">{recoverableError?.message}</p>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={resetRecoverableError}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

/**
 * Error boundary for errors
 * that do not fully disrupt the application flow,
 * and can be (almost) safely dismissed
 */
const RecoverableErrorErrorBoundary: FC<PropsWithChildren> = ({ children }) => (
  <>
    <RecoverableErrorDialog />
    {children}
  </>
);

export default RecoverableErrorErrorBoundary;
