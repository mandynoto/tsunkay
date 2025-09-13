import ChatInterface from "@/components/ChatInterface";

export const metadata = {
  title: "Tsunkay",
  description: "Outsmart an AI Chatbot in 'Guess the Animal'",
};

const welcomeMessages: string[] = [
  "🙂 Hi. I'm thinking of a secret animal. Guess what it is! I can give you up to 10 hints.",
  "🙂 Hey. I'm thinking of a secret animal. Guess what it is! I can give you up to 10 hints.",
  "🙂 Hello. I'm thinking of a secret animal. Guess what it is! I can give you up to 10 hints.",
];

function getRandomWelcomeMessage(): string {
  return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
}

export default function Home() {
  const welcomeMessage = getRandomWelcomeMessage();

  return <ChatInterface welcomeMessage={welcomeMessage} />;
}
