import React from "react";
import styles from "./DevResource.module.css";

const DevResource = () => {
	return (
		<section className={styles.devResource}>
			<div className={styles.container}>
				<div className={styles.title}>
					<h2>Essential Developer Resources</h2>
					<p>
						Everything you need to build, integrate, and profit with Luxodd.
					</p>
				</div>
				<div className={styles.cardsContainer}>
					<div className={styles.card}>
						<h3>Luxodd SDK</h3>
						<p>Essential tools to integrate your game.</p>
					</div>
					<div className={styles.card}>
						<h3>API Documentation</h3>
						<p>Step-by-step integration guide.</p>
					</div>
					<div className={styles.card}>
						<h3>Revenue Share & Monetization</h3>
						<p>Learn how our payouts work.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DevResource;
