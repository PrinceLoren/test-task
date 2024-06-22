import {
  GlobalErrorBoundary,
  RecoverableErrorErrorBoundary,
} from "@/shared/ErrorBoundary";
import Routes from "@/app/routes";

function App() {
  return (
    <GlobalErrorBoundary>
      <RecoverableErrorErrorBoundary>
        <Routes />
      </RecoverableErrorErrorBoundary>
    </GlobalErrorBoundary>
  );
}

export default App;
