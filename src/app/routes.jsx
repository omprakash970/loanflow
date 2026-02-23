import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}