import { ChatMessage } from "./ChatMessage"

export function ChatExample() {
  return (
    <div className="flex flex-col gap-6">
      <ChatMessage
        isBot={true}
        text="Hello! I'm Dashmetrics, your AI assistant for meme coin predictions. How can I help you today?"
        name="Dashmetrics"
        timestamp="2:30 PM"
        avatar="/dashmetrics-bot.png"
      />
      <ChatMessage
        isBot={false}
        text="Hi! I'm looking for information about new meme coins with high potential."
        name="You"
        timestamp="2:31 PM"
        avatar="/placeholder-user.jpg"
      />
      <ChatMessage
        isBot={true}
        text={`I've analyzed the market and found a few interesting opportunities:

1. $PEPE has shown strong social signals in the last 24 hours
2. $BONK is gaining traction on Twitter
3. A new coin $WSM (Wall Street Memes) is launching soon

Would you like me to provide more detailed analysis on any of these?`}
        name="Dashmetrics"
        timestamp="2:31 PM"
        avatar="/dashmetrics-bot.png"
      />
    </div>
  )
}

