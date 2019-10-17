module.exports = {
	extends: ["airbnb-typescript"],
	env: {
		browser: true,
	},
	rules: {
		"import/prefer-default-export": 0,
		"import/no-unresolved": 0,
		'react/jsx-props-no-spreading': 0,
		"import/no-default-export": [2, 'always'],
		'max-len': [2, {
			'code': 100,
			'tabWidth': 2
		}],
		"import/no-extraneous-dependencies": [2, {"devDependencies": ["webpack/**/*"]}],
		"@typescript-eslint/no-use-before-define": 0,
	}
} 