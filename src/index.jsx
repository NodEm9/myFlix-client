import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

import { FooterView } from "./components/footer-view/footer-view";
import { Provider } from "react-redux";
import store from "./store";

import "./sass/index.scss";

const App = () => {
  const user = localStorage.getItem('user')
  return (
    <Provider store={store}>
      <Container fluid className="App justify-content-center" >
        <MainView />
        {!user ? (
          <FooterView /> === 'undefined'
        ) : (
          <FooterView />
        )}
      </Container>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
