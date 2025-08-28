import { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  inline?: boolean;
};

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const textContent = message.parts.map((part) => part.text).join("");
  const isAIThinking = !isUser && textContent.trim() === "";

  return (
    <div
      className={`first:mt-8 w-full flex ${
        isUser ? "justify-end mb-8" : "justify-start mb-16"
      } `}
    >
      <span
        className={`
        leading-8 inline-block rounded-2xl px-4 py-4 shadow-sm break-words max-w-full
        ${
          isUser
            ? "bg-orange-100 text-black whitespace-pre-wrap"
            : "bg-white text-gray-800"
        }
      `}
      >
        {isAIThinking ? (
          "🤔"
        ) : isUser ? (
          textContent
        ) : (
          <ReactMarkdown
            components={{
              p: (props) => (
                <p className="my-1" {...props}>
                  {props.children}
                </p>
              ),
              pre: (props) => (
                <div className="my-2">
                  <pre
                    className="bg-gray-100 p-2 rounded overflow-auto"
                    {...props}
                  />
                </div>
              ),
              code: ({ className, children, ...props }: CodeProps) => (
                <code
                  className={`${
                    props.inline ? "bg-gray-100 px-1 rounded" : "block"
                  } ${className || ""}`}
                  {...props}
                >
                  {children}
                </code>
              ),
              ul: (props) => <ul className="my-1 pl-5 list-disc" {...props} />,
              ol: (props) => (
                <ol className="my-1 pl-5 list-decimal" {...props} />
              ),
              a: (props) => (
                <a
                  className="text-blue-600 hover:underline break-all"
                  {...props}
                />
              ),
            }}
          >
            {textContent}
          </ReactMarkdown>
        )}
      </span>
    </div>
  );
}
