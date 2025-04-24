import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`${siteConfig.title}`}
			description="Onboard game devs to integrate games to Luxxod"
		>
			<main className={styles.main}>
				<div className={styles.container}>
					<h1 className={styles.title}>Luxodd Documentation</h1>
					<p className={styles.description}>Everything you need to build and deploy your games on Luxodd</p>
					
					<div className={styles.links}>
						<a href="/docs/onboard" className={styles.link}>
							<h2>Onboard Your Game</h2>
							<p>Learn how to integrate your game with Luxodd's platform</p>
						</a>
						
						<a href="/docs/deployments" className={styles.link}>
							<h2>Arcade Deployments</h2>
							<p>Guide to deploying your game to physical arcades</p>
						</a>
						
						<a href="/docs/example-game" className={styles.link}>
							<h2>Example Game Documentation</h2>
							<p>Reference implementation and best practices</p>
						</a>
					</div>
				</div>
			</main>
		</Layout>
	);
}
