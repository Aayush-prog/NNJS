import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Mission from "./pages/Mission";
import Partners from "./pages/Partners";
import History from "./pages/History";
import Team from "./pages/Team";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/history" element={<History />} />
        <Route path="/team" element={<Team />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
