import LLMChatbot from "@/app/components/LLMChatbot";
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Career-Assistant
      </h1>
      <LLMChatbot />
    </div>
  );
}