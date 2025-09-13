import ChatInterface from "@/components/ChatInterface";

export const metadata = {
  title: "Tsunkay",
  description: "Outsmart an AI Chatbot in 'Guess the Animal'",
};

const welcomeMessages: string[] = [
  "🙂 I'm a secret animal. Guess what I am in 10 hints or less!",
  "🙂 Hey. I'm a secret animal. Guess what I am in 10 hints or less!",
  "🙂 Hello. I'm a secret animal. Guess what I am in 10 hints or less!",
];

function getRandomWelcomeMessage(): string {
  return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
}

export default function Home() {
  const welcomeMessage = getRandomWelcomeMessage();

  return <ChatInterface welcomeMessage={welcomeMessage} />;
}
