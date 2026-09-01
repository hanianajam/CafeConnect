import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Customer */}
        <Route element={<CustomerLayout />}>

          <Route path="/" element={<Home />} />

        </Route>

        {/* Staff */}
        <Route
          path="/staff/login"
          element={<h1>Staff Login</h1>}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;