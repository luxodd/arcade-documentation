import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title="Developer Documentation"
			description="Onboard game devs to integrate games to Luxodd"
		>
			<main className={styles.main}>
				<div className={styles.container}>
					<h1 className={styles.title}>Luxodd Documentation</h1>
					<p className={styles.description}>
						Everything you need to build and deploy your games on Luxodd
					</p>

					<div className={styles.links}>
						<a href="docs/example-arcade-shooter" className={styles.link}>
							<h2>New To Arcade Games ?</h2>
							<p>Discover Luxodd game sample to get started</p>
						</a>
						<a href="/docs/intro" className={styles.link}>
							<h2>Onboard your game</h2>
							<p>Discover Luxodd game integration in less than 5 minutes</p>
						</a>
						<a href="/docs/category/arcade-launch" className={styles.link}>
							<h2>Arcade Launch</h2>
							<p>Step-by-step guide to integrate your game with our system</p>
						</a>
						<a
							href="/docs/arcade-launch/unity-plugin/overview"
							className={styles.link}
						>
							<h2>Unity Plugin</h2>
							<p>
								Learn how to integrate your Unity games with Luxodd's arcade
								platform
							</p>
						</a>
					</div>
				</div>
			</main>
		</Layout>
	);
}
