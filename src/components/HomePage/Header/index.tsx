import React from "react";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header className={styles.header_container}>
			<h1>Luxodd Developer Hub – Build the Future of Arcade Gaming</h1>
			<div className={styles.sub_heading}>
				<span>Develop ⚙️</span>
				<span>Integrate 🔗</span>
				<span>Monetize 💰</span>
			</div>
		</header>
	);
};

export default Header;
