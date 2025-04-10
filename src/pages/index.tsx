import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Header from "../components/HomePage/Header";
import Onboard from "../components/HomePage/Onboard";
import DevResource from "../components/HomePage/DevResource";
import Support from "../components/HomePage/Support";
import Welcome from "../components/HomePage/Welcome";

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`${siteConfig.title}`}
			description="Onboard game devs to integrate games to Luxxod"
		>
			<main>
				<Header />
				<Welcome />
				<Onboard />
				<DevResource />
				<Support />
			</main>
		</Layout>
	);
}
