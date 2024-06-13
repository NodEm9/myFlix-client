import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Navbar } from "./components/navigation/navbar";

import Container from "react-bootstrap/Container";

import "./scss/index.scss";

const App = () => {
  return ( 
    <Container className="App" > 
      <Navbar />
      <MainView />
    </Container>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
