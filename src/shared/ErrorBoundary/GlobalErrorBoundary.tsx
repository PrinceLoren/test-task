import { FC, PropsWithChildren } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const ErrorDialog: FC<FallbackProps> = ({ error }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Unexpected error</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">{error.message}</p>
      </div>
      <div className="p-4 border-t flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Reload app
        </button>
      </div>
    </div>
  </div>
);

/**
 * A last-resort error boundary,
 * presents the user with the option to reload the app
 */
const GlobalErrorBoundary: FC<PropsWithChildren> = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorDialog}>{children}</ErrorBoundary>
);

export default GlobalErrorBoundary;
