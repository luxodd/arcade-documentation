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
						<a href="/docs/intro" className={styles.link}>
							<h2>Getting Started</h2>
							<p>Discover Luxodd game integration in less than 5 minutes</p>
						</a>
						
						<a href="/docs/arcade-launch/unity-plugin/overview" className={styles.link}>
							<h2>Unity Plugin</h2>
							<p>Learn how to integrate your Unity games with Luxodd's arcade platform</p>
						</a>
						
						<a href="/docs/game-integration" className={styles.link}>
							<h2>Game Integration</h2>
							<p>Step-by-step guide to integrate your game with our system</p>
						</a>
					</div>

					<div className={styles.links}>
						<a href="/docs/getting-started/introduction" className={styles.link}>
							<h2>Introduction</h2>
							<p>Understand the fundamentals of Luxodd's gaming platform</p>
						</a>
						
						<a href="/docs/knowledge-base/game-logic-architecture" className={styles.link}>
							<h2>Game Logic Architecture</h2>
							<p>Deep dive into the game logic architecture</p>
						</a>
						
						<a href="/docs/knowledge-base/ui-logic-architecture" className={styles.link}>
							<h2>UI Logic Architecture</h2>
							<p>Learn about the UI logic architecture for Luxodd games</p>
						</a>
					</div>
				</div>
			</main>
		</Layout>
	);
}
