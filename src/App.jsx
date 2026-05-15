import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Pipeline from "./pages/Pipeline";
import Traces from "./pages/Traces";
import Proposals from "./pages/Proposals";
import CreateCampaign from "./pages/CreateCampaign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pipeline" element={<Pipeline />} />
                <Route path="/traces" element={<Traces />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route
                  path="/create-campaign"
                  element={<CreateCampaign />}
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;