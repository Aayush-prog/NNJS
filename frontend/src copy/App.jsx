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
import Locations from "./pages/Locations";
import EthicalReview from "./pages/EthicalReview";
import Resources from "./pages/Resources";
import PressAndMedia from "./pages/PressAndMedia";
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
        <Route path="/what_we_do" element={<Locations />} />
        <Route path="/ethical" element={<EthicalReview />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/press" element={<PressAndMedia />} />
        
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}


export default App;
