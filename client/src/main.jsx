import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import AuthProvider from "./context/AuthContext"
import "./index.css"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SettingsProvider } from "./context/SettingsContext"
ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<AuthProvider>
<SettingsProvider>
<App/>
</SettingsProvider>

</AuthProvider>
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="colored"
  />
</BrowserRouter>
)