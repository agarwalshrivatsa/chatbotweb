import React, { useEffect, useState } from "react";
import { botMessages } from "../../chatConfig";
import ChatBody from "../Molecules/ChatBody";
import ChatFoot from "../Molecules/ChatFoot";

export default function ChatArea() {
	const [messages, setMessages] = useState([
		{
			text: botMessages[0].text,
			options: botMessages[0].options,
			fromUser: false,
		},
	]);

	const [currQ, setCurrQ] = useState({
		name: "",
		category: "",
		question: "",
		country: "",
	});

	const [status, setStatus] = useState(0);

	useEffect(() => {
		if (messages[messages.length - 1].fromUser) {
			addMessage(
				botMessages[status].text,
				botMessages[status].options,
				false
			);
		}
	}, [status]);

	useEffect(() => {
		let mess = messages[messages.length - 1];
		if (mess.fromUser) {
			if (botMessages[status].purpose !== "restart") {
				if (botMessages[status].ifInvalid !== null) {
					if (botMessages[status].checkValidity(mess.text)) {
						setCurrQ((prev) => ({
							...prev,
							[botMessages[status].purpose]: mess.text,
						}));
						setStatus((prev) => prev + 1);
					} else {
						addMessage(botMessages[status].ifInvalid, [], false);
					}
				} else {
					setCurrQ((prev) => ({
						...prev,
						[botMessages[status].purpose]: mess.text,
					}));
					setStatus((prev) => prev + 1);
				}
			} else {
				sendFaq(currQ);
				if (mess.text === "Yes") {
					setStatus(2);
				} else {
					setStatus(0);
				}
			}
		}
	}, [messages]);

	function sendFaq(faq) {
		fetch("http://127.0.0.1:5000/addFaq", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: faq,
		})
			.then((response) => response.json())
			.then(
				(response) => {
					console.log(response);
				},
				(err) => {
					if (err instanceof TypeError) {
						addMessage(botMessages.connectionError.text, [], false);
					}
					console.log(err);
				}
			);
	}

	function addMessage(text, options, fromUser) {
		setMessages((prev) => [
			...prev,
			{
				text: text,
				options: options,
				fromUser: fromUser,
			},
		]);
	}

	return (
		<div className='flex my-2 justify-center items-center flex-col bg-gray-100 lg:w-6/12 sm:w-6/12 h-5/6 m-auto'>
			<ChatBody messages={messages} addMessage={addMessage} />
			<ChatFoot addMessage={addMessage} status={status} />
		</div>
	);
}
