import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Navigationbar } from "./components/navigation/navbar";
import Container from "react-bootstrap/Container";

import "./scss/index.scss";
import Row from "react-bootstrap/Row";

const App = () => {
  return (
    <Container className="App h-100" >
      <Row>
        <Navigationbar />
      </Row>
      <MainView />
    </Container>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
