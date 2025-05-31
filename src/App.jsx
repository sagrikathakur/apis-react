import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LogInPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

function App() {
  const token = sessionStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/recipes" /> : <LoginPage />} />
        <Route path="/recipes" element={token ? <RecipeListPage /> : <Navigate to="/" />} />
        <Route path="/recipes/:id" element={token ? <RecipeDetailPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
