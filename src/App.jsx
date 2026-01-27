import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Final from "./pages/Final";
import Resumen from "./pages/Resumen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas a pantalla completa (Sin "LA FAMILIA") */}
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<Category />} />
        <Route path="/final" element={<Final />} />

        {/* Única página que conserva el Layout (si así lo deseas) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/resumen" element={<Resumen />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
