import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { ProgramDetailPage } from "@/pages/ProgramDetailPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
