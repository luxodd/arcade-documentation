import React, { type ReactNode } from "react";
import Logo from "@theme/Logo";
import styles from "./styles.module.css";

export default function NavbarLogo(): ReactNode {
	return (
		<Logo
			className={styles.navbarLogo}
			// imageClassName="navbar__logo"
			titleClassName="navbar__title text--truncate"
		/>
	);
}
