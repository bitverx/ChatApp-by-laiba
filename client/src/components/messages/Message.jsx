import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageFormat from "./MessagesFormat";
import useListenMessages from "../../hooks/useListenMessages";

const Message = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <MessageFormat message={message} />
          </div>
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-500">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Message;
