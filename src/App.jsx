import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './components/Home';
import Detail from './components/Detail';
import Pocket from './components/Pocket';
import Footer from './components/Footer';
import Header from './components/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/pocket" element={<Pocket />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
