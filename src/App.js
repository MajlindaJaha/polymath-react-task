import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <Suspense fallback="loading">
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
