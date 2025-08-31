import { VscGithubAlt } from "react-icons/vsc";

export default function Footer() {
  return (
    <footer className="py-6 flex justify-center items-center relative">
      <p className="text-center text-xs text-gray-400">
        Tsunkay can make mistakes, so let&apos;s double-check responses
      </p>
      <a
        href="https://github.com/mandynoto/tsunkay"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-gray-400 absolute right-6"
      >
        <VscGithubAlt size={12} />
      </a>
    </footer>
  );
}
