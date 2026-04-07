import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { ProgramDetailPage } from "@/pages/ProgramDetailPage";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
