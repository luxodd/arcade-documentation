import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

// Simple markdown renderer for inline content
const MarkdownText: React.FC<{ children: string }> = ({ children }) => {
	// Convert markdown to HTML-like JSX
	const renderMarkdown = (text: string) => {
		// Handle backticks for inline code
		let result = text.replace(/`([^`]+)`/g, "<code>$1</code>");

		// Handle bold text
		result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

		// Handle italic text
		result = result.replace(/\*([^*]+)\*/g, "<em>$1</em>");

		// Split by HTML tags and render appropriately
		const parts = result.split(/(<[^>]+>[^<]*<\/[^>]+>)/);

		return parts.map((part, index) => {
			if (part.startsWith("<code>") && part.endsWith("</code>")) {
				const content = part.replace(/<\/?code>/g, "");
				return (
					<code key={index} className="language-text">
						{content}
					</code>
				);
			} else if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
				const content = part.replace(/<\/?strong>/g, "");
				return <strong key={index}>{content}</strong>;
			} else if (part.startsWith("<em>") && part.endsWith("</em>")) {
				const content = part.replace(/<\/?em>/g, "");
				return <em key={index}>{content}</em>;
			} else {
				return part;
			}
		});
	};

	return <>{renderMarkdown(children)}</>;
};

interface ApiMethod {
	signature: string;
	description: string;
}

interface ApiMethodTableProps {
	title: string;
	methods: ApiMethod[];
	type?: "methods" | "callbacks" | "properties";
}

export const ApiMethodTable: React.FC<ApiMethodTableProps> = ({
	title,
	methods,
	type = "methods",
}) => {
	const getColumnTitle = () => {
		switch (type) {
			case "callbacks":
				return "Callback";
			case "properties":
				return "Property";
			default:
				return "Method";
		}
	};

	return (
		<div className={styles.apiMethodTable}>
			<h3 className={styles.tableTitle}>{title}</h3>

			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.methodColumn}>{getColumnTitle()}</th>
						<th className={styles.descriptionColumn}>Description</th>
					</tr>
				</thead>
				<tbody>
					{methods.map((method, index) => (
						<tr key={index}>
							<td className={styles.methodCell}>
								<CodeBlock language="csharp" className={styles.codeBlock}>
									{method.signature}
								</CodeBlock>
							</td>
							<td className={styles.descriptionCell}>
								<MarkdownText>{method.description}</MarkdownText>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ApiMethodTable;
