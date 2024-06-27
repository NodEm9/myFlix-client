import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

import { FooterView } from "./components/footer-view/footer-view";
import { Provider } from "react-redux";
import store from "./store";

import "./sass/index.scss";

const App = () => {
  return ( 
    <Provider store={store}>
      <Container className="App h-100 justify-content-center" > 
      <MainView /> 
      <FooterView />
      </Container> 
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
