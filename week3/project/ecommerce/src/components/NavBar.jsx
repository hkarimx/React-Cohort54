import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <header className="topBar">
            <nav className="topNav">
                <NavLink className="topLink" to="/">
                    Products
                </NavLink>
                <NavLink className="topLink" to="/favourites">
                    Favourites
                </NavLink>
            </nav>
        </header>
    );
}
