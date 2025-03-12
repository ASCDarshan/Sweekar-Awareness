/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { theme } from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import HomePage from "./pages/HomePage";
import IntroductionPage from './pages/IntroductionPage';
import HistoricalPage from './pages/HistoricalPage';
import QuizPage from './pages/QuizPage';
import GlossaryPage from './pages/GlossaryPage';
import ProgressPage from './pages/ProgressPage';
import ResourcesPage from './pages/ResourcesPage';
import { ProgressProvider } from "./contexts/ProgressContext";
import Layout from "./components/layout/Layout";


const PlaceholderPage = ({ title }) => (
  <div>
    <h2>{title}</h2>
    <p>This section is under development.</p>
  </div>
);

const ErrorPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <ProgressProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/introduction" element={<IntroductionPage />} />
                <Route path="/history" element={<HistoricalPage />} />
                <Route path="/history/:subsectionId" element={<HistoricalPage />} />
                <Route path="/quiz/:sectionId" element={<QuizPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/identities" element={<PlaceholderPage title="Sexual Orientation & Gender Identity" />} />
                <Route path="/legal" element={<PlaceholderPage title="Legal Landscape" />} />
                <Route path="/challenges" element={<PlaceholderPage title="Social Challenges" />} />
                <Route path="/progress" element={<PlaceholderPage title="Progress & Developments" />} />
                <Route path="/profile" element={<ProgressPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Layout >
          </Router>
        </ProgressProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
