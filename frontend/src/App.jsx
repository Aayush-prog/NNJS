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
import Locations from "./pages/WhatWeDo";
import EthicalReview from "./pages/EthicalReview";
import Resources from "./pages/Resources";
import PressAndMedia from "./pages/PressAndMedia";
import HospitalDetail from "./components/HospitalDetail";
import CenterDetail from "./components/CenterDetail";
import BranchDetail from "./components/BranchDetail";
import Login from "./pages/Login";
import AdminLanding from "../admin/pages/LandingPage";
import AdminMission from "../admin/pages/Mission";
import AdminContact from "../admin/pages/Contact";
import AdminPartners from "../admin/pages/Partners";
import AdminHistory from "../admin/pages/History";
import AdminTeam from "../admin/pages/Team";
import AdminLocations from "../admin/pages/WhatWeDo";
import AdminEthicalReview from "../admin/pages/EthicalReview";
import AdminResources from "../admin/pages/Resources";
import AdminPressAndMedia from "../admin/pages/PressAndMedia";
import AdminHospitalDetail from "../admin/components/HospitalDetail";
import AdminCenterDetail from "../admin/components/CenterDetail";
import AdminBranchDetail from "../admin/components/BranchDetail";
import AdminDonate from "../admin/pages/Donate";
import PrivateRouter from "../PrivateRouter";
import Entry from "./pages/Entry";
import AdminProgram from "../admin/pages/Program";
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
        <Route path="/what_we_do" element={<Locations />}>
          <Route path="hospital/:id" element={<HospitalDetail />} />
          <Route path="care/:id" element={<CenterDetail />} />
          <Route path="branch/:id" element={<BranchDetail />} />
        </Route>

        <Route path="/ethical" element={<EthicalReview />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/press" element={<PressAndMedia />} />
        <Route path="/login" element={<Login />} />
        <Route path="/program" element={<Entry />} />
        <Route path="/admin">
          <Route index element={<PrivateRouter element={<AdminLanding />} />} />
          <Route
            path="/admin/mission"
            element={<PrivateRouter element={<AdminMission />} />}
          />
          <Route
            path="/admin/donate"
            element={<PrivateRouter element={<AdminDonate />} />}
          />
          <Route
            path="/admin/contact"
            element={<PrivateRouter element={<AdminContact />} />}
          />
          <Route
            path="/admin/mission"
            element={<PrivateRouter element={<AdminMission />} />}
          />
          <Route
            path="/admin/partners"
            element={<PrivateRouter element={<AdminPartners />} />}
          />
          <Route
            path="/admin/history"
            element={<PrivateRouter element={<AdminHistory />} />}
          />
          <Route path="/admin/team" element={<AdminTeam />} />
          <Route
            path="/admin/what_we_do"
            element={<PrivateRouter element={<AdminLocations />} />}
          >
            <Route path="hospital/:id" element={<AdminHospitalDetail />} />
            <Route path="care/:id" element={<AdminCenterDetail />} />
            <Route path="branch/:id" element={<AdminBranchDetail />} />
          </Route>

          <Route
            path="/admin/ethical"
            element={<PrivateRouter element={<AdminEthicalReview />} />}
          />
          <Route
            path="/admin/resources"
            element={<PrivateRouter element={<AdminResources />} />}
          />
          <Route
            path="/admin/press"
            element={<PrivateRouter element={<AdminPressAndMedia />} />}
          />
          <Route path="/admin/program" element={<AdminProgram />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
