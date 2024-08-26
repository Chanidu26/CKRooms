import React from "react";

function Navbar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    function logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "/";
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="/"
                    style={{
                        fontFamily: "cursive",
                        fontSize: "25px",
                        color: "white",
                    }}
                >
                    CKRooms
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav dropdown-menu-lg-end">
                        {currentUser ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        color: "white",
                                        fontSize: "15px",
                                        backgroundColor: "transparent",
                                        border: "none",
                                    }}
                                >
                                    {currentUser.userName} &nbsp;
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item" href="/profile">
                                            Bookings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/"
                                            onClick={logout}
                                        >
                                            Log out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                            
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="/register"
                                        style={{
                                            color: "white",
                                            fontSize: "13px",
                                        }}
                                    >
                                        Register
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="/login"
                                        style={{
                                            color: "white",
                                            fontSize: "13px",
                                        }}
                                    >
                                        Login
                                    </a>
                                </li>{" "}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;