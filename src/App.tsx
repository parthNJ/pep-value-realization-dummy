import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { GccPage } from "@/pages/GccPage";
import { ProductivityPage } from "@/pages/ProductivityPage";
import { ProgramDetailPage } from "@/pages/ProgramDetailPage";
import { ValueRealizationPage } from "@/pages/ValueRealizationPage";

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
        <Route path="/benefits" element={<Dashboard />} />
        <Route path="/gcc" element={<GccPage />} />
        <Route path="/productivity" element={<ProductivityPage />} />
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="*" element={<ValueRealizationPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
