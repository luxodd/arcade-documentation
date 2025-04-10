import React from "react";
import styles from "./Onboard.module.css";
const Oboard = () => {
	return (
		<section className={styles.onboard}>
			<div className={styles.container}>
				<h2>Why Build for Luxodd?</h2>
				<div className={styles.cardsContainer}>
					<div className={styles.card}>
						<h3>Easy Integration</h3>
						<p>
							Use our Luxodd SDK to connect your game to our system in just a
							few steps.v
						</p>
					</div>
					<div className={styles.card}>
						<h3>Skill-Based, Reward-Driven</h3>
						<p>
							Get your game into physical arcades, bars, and entertainment
							venues all over the world.
						</p>
					</div>
					<div className={styles.card}>
						<h3>Get Paid Your Worth</h3>
						<p>
							Turn your game into a money-making machine! Every play,
							competition, and engagement means real revenue for you.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Oboard;
