import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeUser from "../pages/home/homeUser";

export default function OtherRoutes() {
    return (
        <Router>
            <Route path="/" element={<HomeUser />} />
        </Router>
    );
}