import ChatInterface from "@/components/ChatInterface";

export const metadata = {
  title: "Tsunkay",
  description: "Outsmart an AI Chatbot in 'Guess the Animal'",
};

const welcomeMessages: string[] = [
  "🙂 Hey let's play 'Guess what animal I am?' You get 10 hints",
  "🙂 Hi, we're playing 'Guess what animal I am?' 10 hints and we're done",
  "🙂 Hello, let's play 'Guess what animal I am?' I give you 10 hints",
];

function getRandomWelcomeMessage(): string {
  return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
}

export default function Home() {
  const welcomeMessage = getRandomWelcomeMessage();

  return <ChatInterface welcomeMessage={welcomeMessage} />;
}
