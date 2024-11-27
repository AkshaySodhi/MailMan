import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
function App() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <BrowserRouter>
              <Routes>
                <Route
                  index
                  element={<Login />}
                />
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />
              </Routes>
            </BrowserRouter>
          </div>
        </div>

      </div >
    </>
  )
}

export default App
