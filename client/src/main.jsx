import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import AuthProvider from "./context/AuthContext"
import "./index.css"
import { SettingsProvider } from "./context/SettingsContext"
ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<AuthProvider>
<SettingsProvider>
<App/>
</SettingsProvider>

</AuthProvider>
</BrowserRouter>
)