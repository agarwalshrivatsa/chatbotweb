import React, { useState } from "react";

export default function Message({ message, addMessage }) {
	const [selected, setSelected] = useState(false);

	const optionButton = (option) => (
		<button
			className=' bg-green-500 font-semibold rounded hover:bg-green-600 active:font-bold p-1 m-1 '
			onClick={() => {
				addMessage(option, [], true);
				setSelected(true);
			}}
			key={option}
		>
			{option}
		</button>
	);

	return (
		<div className='flex flex-col w-full p-2'>
			<div
				className={`rounded text-left bg-gray-800 w-max p-3 py-2 max-w-xs ${
					message.fromUser ? "self-end" : "self-start"
				} text-white`}
			>
				{message.text}
				{selected
					? ""
					: message.options.map((val) => optionButton(val))}
			</div>
		</div>
	);
}
