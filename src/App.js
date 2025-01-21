import Home from "./components/pages/Home/Home";
import { fetchTables } from "./redux/tablesRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import More from "./components/pages/More/More";
import NotFound from './NotFound/NotFound';
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";

const App= () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);
  return (
      <Container>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/table/:tableId" element={<More />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>     
  );
}

export default App;
