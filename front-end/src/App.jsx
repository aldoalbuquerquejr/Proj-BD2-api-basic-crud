import axios from "axios";
import { SelectContainer } from "./components/SelectContainer";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

function App() {
  return (
    <div className="bg-gray-950 text-slate-50 flex flex-col justify-center gap-3 p-10 items-center min-h-screen min-w-full">
      <SelectContainer />
    </div>
  );
}

export default App;
