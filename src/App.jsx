import { useState } from "react";
import { getToken } from "./auth";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";

import { LoginPage, NewsPage, NewsDetailPage } from "./pages";
import { Toolbar, NotFound } from "./components";

function App() {
  return (
    <Router>
      <Toolbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/news" element={<PrivateRoute><NewsPage /></PrivateRoute>} />
        <Route path="/news/:id" element={
          <PrivateRoute>
            <NewsDetailWrapper />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/" />;
}

function NewsDetailWrapper() {
  const { id: _id } = useParams();
  const [notFound, setNotFound] = useState(false);

  if (notFound) {
    return <NotFound />;
  }

  return <NewsDetailPage onNotFound={() => setNotFound(true)} />;
}

export default App;
