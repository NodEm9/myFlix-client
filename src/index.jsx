import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Navbar } from "./components/navigation/navbar";


import "./index.scss";



const App = () => { 
  return (
    <div className="App">
        <Navbar />
        <MainView />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
