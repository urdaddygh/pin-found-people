import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import MainPage from "./pages/MainPage";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/main/*" element={<MainPage />} />
        <Route path="/*" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
