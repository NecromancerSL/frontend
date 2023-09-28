import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../pages/login";

export default function SignRoutes() {
    return (
        <Router>
            <Route path="/" element={<Login />} />
        </Router>
    );
}