"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"

const SUGGESTED_QUESTIONS = [
  "What are the admission requirements?",
  "What certifications will I earn?",
  "Can I work while studying?",
  "Tell me about the co-op program",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestionClick = (question: string) => {
    sendMessage({ text: question })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/25",
          isOpen && "rotate-0"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <div className="flex h-[500px] max-h-[70vh] flex-col">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  DES Program Assistant
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ask me anything about the program
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <Conversation className="flex-1">
            <ConversationContent className="p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col gap-4">
                  <Message from="assistant">
                    <MessageContent className="rounded-2xl bg-secondary/50 px-4 py-3">
                      <MessageResponse className="text-sm text-foreground">
                        Hi! I&apos;m here to help you learn about the Digital Engagement
                        Strategy program at Centennial College. What would you like
                        to know?
                      </MessageResponse>
                    </MessageContent>
                  </Message>

                  {/* Suggested Questions */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Quick questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_QUESTIONS.map((question) => (
                        <button
                          key={question}
                          onClick={() => handleSuggestionClick(question)}
                          className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <Message
                    key={message.id}
                    from={message.role}
                    className={cn(
                      message.role === "user" && "flex justify-end"
                    )}
                  >
                    <MessageContent
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50"
                      )}
                    >
                      {message.parts.map((part, i) => {
                        if (part.type === "text") {
                          return (
                            <MessageResponse
                              key={i}
                              className={cn(
                                "text-sm whitespace-pre-wrap",
                                message.role === "user"
                                  ? "text-primary-foreground"
                                  : "text-foreground"
                              )}
                            >
                              {part.text}
                            </MessageResponse>
                          )
                        }
                        return null
                      })}
                    </MessageContent>
                  </Message>
                ))
              )}

              {/* Loading indicator */}
              {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
                <Message from="assistant">
                  <MessageContent className="max-w-[85%] rounded-2xl bg-secondary/50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </MessageContent>
                </Message>
              )}

              <div ref={messagesEndRef} />
            </ConversationContent>
          </Conversation>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-border bg-card p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={isLoading}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:shadow-md disabled:opacity-50"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
