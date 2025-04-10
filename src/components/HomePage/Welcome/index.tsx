import React from "react";
import styles from "./Welcome.module.css";

const Welcome = () => {
	return (
		<section className={styles.welcome}>
			<div className={styles.container}>
				<h2>Welcome</h2>
				<p>
					Luxodd is the world’s first strategic betting arcade gaming platform,
					designed to transform arcade gaming into a competitive, high-revenue
					ecosystem. We provide game developers with new ways to monetize their
					games through pay-to-play, mission betting and tournaments, in
					high-traffic venues like bars, gaming lounges, and entertainment
					centers.
				</p>
			</div>
		</section>
	);
};

export default Welcome;
