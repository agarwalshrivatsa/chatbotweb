import React, { useState } from "react";

export default function ChatFoot({ addMessage, status }) {
	const [curText, setCurText] = useState(null);
	return (
		<div className='bottom-0 w-full'>
			<input
				type='text'
				id='textbox'
				name='message'
				placeholder='Type a message'
				className='border w-72 h-8 m-2 rounded p-2'
				onChange={(e) => {
					setCurText(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addMessage(curText, [], true);
						document.getElementById("textbox").value = "";
					}
				}}
			></input>
			<button
				className='w-12 h-8 bg-gray-800 text-white rounded'
				onClick={() => {
					addMessage(curText, [], true);
					document.getElementById("textbox").value = "";
				}}
				disabled={status === 2 || status === 4 ? true : false}
			>
				Send
			</button>
		</div>
	);
}
