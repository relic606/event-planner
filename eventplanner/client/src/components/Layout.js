import { Outlet, Link } from "react-router-dom";
import React from "react";

const Layout = () => {
	return (
		<>
			<header>
				<h2>Kelsy's Event Planner</h2>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/pastevents">Past Events</Link>
				</nav>
			</header>

			<Outlet />
			<div className="dog-container">
				<div className="dog">
					<div className="dog-body"></div>
					<div className="leg-1"></div>

					<div className="leg-2"></div>
					<div className="leg-3"></div>
					<div className="leg-4"></div>
					<div className="tail"></div>
					<div className="ear"></div>
					<div className="nose"></div>
					<div className="eye"></div>
					<div className="tongue"></div>
				</div>
			</div>
			<footer></footer>
		</>
	);
};

export default Layout;
