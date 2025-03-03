module.exports = {
	matchRoot: "pkgtest",
	locks: false,
	entries: [
		{
			fileTests: {
				testMatch: "**/*.ts",
				runWith: ["node", "ts-node", "tsx"],
				transforms: {
					typescript: {
						version: "^5.0.0",
						tsNode: {
							version: "^10.9.2",
						},
						tsx: {
							version: "^4.19.2",
						},
						nodeTypes: {
							version: "^20.0.0",
						},
					},
				},
			},
			binTests: {
				justForPkgtest: [
					{
						args: "",
					},
				],
			},
			scriptTests: [
				{
					name: "scriptTest",
					script: "node -e \"console.log('hello');\"",
				},
			],
			packageManagers: ["yarn-v1", "yarn-berry", "npm", "pnpm"],
			moduleTypes: ["commonjs", "esm"],
			timeout: 4000, // For runners
		},
	],
};
