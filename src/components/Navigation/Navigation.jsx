import { react } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  Routes,
  Route,
} from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const history = useNavigate();
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </>
  );
}
