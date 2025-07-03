import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './components/ui/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';

function App() {
  return (

    <Router> {/* ✅ Wrap everything inside Router */}
      <div className="flex flex-col overflow-hidden bg-white">
        <h1>Header component</h1>
        
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
