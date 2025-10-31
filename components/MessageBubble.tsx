import { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  inline?: boolean;
  node?: unknown;
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
        leading-8 inline-block rounded-2xl px-4 py-4  break-words max-w-full 
        ${isUser ? "bg-orange-100  whitespace-pre-wrap" : "bg-transparent"}
      `}
      >
        {isAIThinking ? (
          "🤔"
        ) : isUser ? (
          textContent
        ) : (
          <ReactMarkdown
            components={{
              pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
                <div className="my-3">
                  <pre
                    className="bg-gray-100 p-5 rounded-2xl overflow-auto"
                    {...props}
                  />
                </div>
              ),
              code: (props: CodeProps) => (
                <code
                  className={`${
                    props.inline
                      ? "bg-gray-100 px-2 py-0.5 rounded-md"
                      : "block"
                  } ${props.className || ""}`}
                  {...props}
                >
                  {props.children}
                </code>
              ),
              ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
                <ul className="my-1 pl-5 list-disc" {...props} />
              ),
              ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
                <ol className="my-1 pl-5 list-decimal" {...props} />
              ),
              a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                <a
                  className="text-blue-600 hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
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
