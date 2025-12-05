import { PyramidProvider } from "./context/PyramidContext/PyramidProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PyramidBuilder from "./components/PyramidBuilder/PyramidBuilder";
import AnalysisPage from "./components/AnalysisPage/AnalysisPage";
import Layout from "./components/Layout/Layout";
import { DndProvider } from "./context/DndProvider";
import { KeyboardNavigationProvider } from "./context/KeyboardNavigationContext/KeyboardNavigationProvider";
import { GlobalKeydownHandler } from "./components/GlobalKeydownHandler/GlobalKeydownHandler";
import { Toast } from "./components/Toast/Toast";

function App() {
  return (
    <KeyboardNavigationProvider>
      <PyramidProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <DndProvider>
            <GlobalKeydownHandler />
            <Toast />
            <Layout>
              <Routes>
                <Route path="/" element={<PyramidBuilder />} />
                <Route path="/analysis" element={<AnalysisPage />} />
              </Routes>
            </Layout>
          </DndProvider>
        </Router>
      </PyramidProvider>
    </KeyboardNavigationProvider>
  );
}

export default App;
