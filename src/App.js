import GameCanvas from "./components/GameCanvas/GameCanvas";
import {useState} from "react";

function App() {
    const [scene, setScene] = useState(null)

    return (
    <div>
      <GameCanvas></GameCanvas>
    </div>
  );
}

export default App;
