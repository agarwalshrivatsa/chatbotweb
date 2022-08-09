export const isNameValid = (nickname) => {
	for (let i = 0; i < nickname.length; i++) {
		let a = nickname.charCodeAt(i);
		if (
			(a >= 48 && a <= 57) ||
			(a >= 65 && a <= 90) ||
			(a >= 97 && a <= 122) ||
			a === 45 ||
			a === 95
		) {
		} else {
			return false;
		}
	}
	return true;
};

export const isQuestionValid = (question) => {
	if (question.length > 200) {
		return false;
	}
	return true;
};

export const botMessages = [
	{
		purpose: "name",
		text: "Hi! I am OSLBot! Please tell me your nickname.",
		options: [],
		checkValidity: isNameValid,
		ifInvalid:
			"That's an invalid name. Only alphabets, numerals, underscore, and hyphen are allowed. Please send a valid nickname.",
	},
	{
		purpose: "country",
		text: "Which of these countries do you belong to?",
		options: ["CHN", "SGP", "GBR", "USA"],
		ifInvalid: null,
		checkValidity: null,
	},
	{
		purpose: "category",
		text: "Which of these categories is your query about?",
		options: [
			"KYC onboarding",
			"Funding features",
			"Trading features",
			"Custody features",
			"Fee schedule",
			"Security",
			"Others",
		],
		ifInvalid: null,
		checkValidity: null,
	},
	{
		purpose: "question",
		text: "Please give details of your question in no more than 200 words.",
		options: [],
		ifInvalid:
			"Please keep the question within 200 words and send it again. Thank you!",
		checkValidity: isQuestionValid,
	},
	{
		purpose: "restart",
		text: "Your query has been received. Do you have another query?",
		options: ["Yes", "No"],
		ifInvalid: null,
		checkValidity: null,
	},
];
