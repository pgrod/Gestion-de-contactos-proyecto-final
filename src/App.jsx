import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacto from './components/Contacto.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
     )
}

export default App
