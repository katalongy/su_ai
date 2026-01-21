import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import JsonFormatter from './pages/JsonFormatter';
import QrGenerator from './pages/QrGenerator';
import UuidGenerator from './pages/UuidGenerator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="json-formatter" element={<JsonFormatter />} />
        <Route path="qr-generator" element={<QrGenerator />} />
        <Route path="uuid-generator" element={<UuidGenerator />} />
      </Route>
    </Routes>
  );
}

export default App;
