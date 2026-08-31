import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PAGE_URLS } from "utils/urls";
import { HomePage } from "features/home/HomePage";
import { UserProvider } from "utils/context";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={PAGE_URLS.baseurl} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
