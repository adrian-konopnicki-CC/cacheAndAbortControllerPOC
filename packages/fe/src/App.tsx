import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MaxAge } from "./pages/MaxAge";
import { NoCache } from "./pages/NoCache";
import { NoStore } from "./pages/NoStore";
import { StaleWhileRevalidate } from "./pages/StaleWhileRevalidate";
import { Navigation } from "./components/Navigation";
import { ETag } from "./pages/ETag";
import { AbortControllerTanstack } from "./pages/AbortControllerTanstack";
import { AbortControllerManual } from "./pages/AbortControllerManual";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/max-age" element={<MaxAge />} />
          <Route path="/no-cache" element={<NoCache />} />
          <Route path="/no-store" element={<NoStore />} />
          <Route
            path="/stale-while-revalidate"
            element={<StaleWhileRevalidate />}
          />
          <Route path="/etag" element={<ETag />} />
          <Route
            path="/abort-controller-tanstack"
            element={<AbortControllerTanstack />}
          />
          <Route
            path="/abort-controller-manual"
            element={<AbortControllerManual />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
