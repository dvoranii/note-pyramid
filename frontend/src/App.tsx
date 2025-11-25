import { PyramidProvider } from "./context/PyramidProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PyramidBuilder from "./components/PyramidBuilder/PyramidBuilder";
import AnalysisPage from "./components/AnalysisPage/AnalysisPage";
import Layout from "./components/Layout/Layout";
import { DndProvider } from "./context/DndProvider";

function App() {
  return (
    <PyramidProvider>
      <Router>
        <DndProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<PyramidBuilder />} />
              <Route path="/analysis" element={<AnalysisPage />} />
            </Routes>
          </Layout>
        </DndProvider>
      </Router>
    </PyramidProvider>
  );
}

export default App;
