import ChatInterface from "@/components/ChatInterface";

const welcomeMessages = [
  "🙂 Hey let's play 'Guess what animal I am?' You get 10 hints",
  "🙂 Hi, we're playing 'Guess what animal I am?' 10 hints and we're done",
  "🙂 Hello, let's play 'Guess what animal I am?' I give you 10 hints",
];

function getRandomWelcomeMessage() {
  return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
}

export default function Home() {
  const welcomeMessage = getRandomWelcomeMessage();

  return <ChatInterface welcomeMessage={welcomeMessage} />;
}
