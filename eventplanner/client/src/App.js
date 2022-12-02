import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/Layout";
import PastEvents from "./components/PastEvents";
import EventDetails from "./components/EventDetails";

export default function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />

						<Route path="pastevents" element={<PastEvents />} />
						<Route path="event/:id" element={<EventDetails />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

///////
