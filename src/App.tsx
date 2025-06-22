import { Routes } from "./pages/Routes";
import QueryProvider from "./queries/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <Routes />
    </QueryProvider>
  );
}

export default App;
