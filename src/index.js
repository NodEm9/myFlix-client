import { createRoot } from "react-dom/client";

import "./index.scss";


const MyFlixApplication = () => { 
  return (
    <div className="my-flix">
      <h1>Good Morning.</h1>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
