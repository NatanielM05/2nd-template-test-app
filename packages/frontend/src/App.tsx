import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TasksPage } from './pages/TasksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
