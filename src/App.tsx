import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { ProgramDetailPage } from "@/pages/ProgramDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
