import React from "react";
import { 
	HashRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";

import { useSelector } from "react-redux";

//import components
import Home from "./pages/Home/Home"
import Profil from "./pages/Profil/Profil"
import Login from "./pages/Login/Login"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"


const App = () => {

	const auth = useSelector(state => state.login.token);

	return (
		<>
			<HashRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={auth ? <Navigate to="/profile"/> : <Login />} />
					<Route path="/profile" element={(!auth) ? <Navigate to="/login"/> : <Profil />} />
					<Route path="*" element={<Navigate replace to="/" />} />
				</Routes>
				<Footer />
			</HashRouter>
		</>
	);
};

export default App;