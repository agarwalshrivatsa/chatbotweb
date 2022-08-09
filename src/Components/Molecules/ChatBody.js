import React from "react";
import Message from "../Atoms/Message";

export default function ChatBody({ messages, addMessage }) {
	return (
		<div className='w-full border h-full flex flex-col overflow-y-auto'>
			{messages.map((val, i) => (
				<Message message={val} key={i} addMessage={addMessage} />
			))}
		</div>
	);
}
