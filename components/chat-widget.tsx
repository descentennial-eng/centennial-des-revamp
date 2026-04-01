"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react"
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
  "Tell me about the co-op program",
  "Who is this program for?",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    setHasInteracted(true)
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestionClick = (question: string) => {
    setHasInteracted(true)
    sendMessage({ text: question })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl hover:shadow-primary/25",
          isOpen && "rotate-90"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        <span className={cn(
          "absolute transition-all duration-300",
          isOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
        )}>
          <X size={24} />
        </span>
        <span className={cn(
          "absolute transition-all duration-300",
          isOpen ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"
        )}>
          <MessageCircle size={24} />
        </span>
      </button>

      {/* Notification dot for new users */}
      {!hasInteracted && !isOpen && (
        <span className="fixed bottom-[4.5rem] right-6 z-50 flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
      )}

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        )}
      >
        <div className="flex h-[520px] max-h-[70vh] flex-col">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-border bg-gradient-to-r from-primary/5 to-transparent px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Sparkles size={20} className="text-primary" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  DES Program Assistant
                </h3>
                <p className="text-xs text-muted-foreground">
                  Powered by AI - Ask me anything
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <Conversation className="flex-1">
            <ConversationContent className="p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col gap-5">
                  <Message from="assistant">
                    <MessageContent className="rounded-2xl rounded-tl-sm bg-secondary/60 px-4 py-3">
                      <MessageResponse className="text-sm leading-relaxed text-foreground">
                        Hi there! I&apos;m here to help you learn about the Digital
                        Engagement Strategy program at Centennial College. Whether you&apos;re
                        curious about admissions, certifications, or career outcomes - just ask!
                      </MessageResponse>
                    </MessageContent>
                  </Message>

                  {/* Suggested Questions */}
                  <div className="flex flex-col gap-2.5 pl-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Popular questions
                    </p>
                    <div className="flex flex-col gap-2">
                      {SUGGESTED_QUESTIONS.map((question) => (
                        <button
                          key={question}
                          onClick={() => handleSuggestionClick(question)}
                          className="group flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-left text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
                        >
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Send size={10} />
                          </span>
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      from={message.role}
                      className={cn(
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <MessageContent
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3",
                          message.role === "user"
                            ? "rounded-br-sm bg-primary text-primary-foreground"
                            : "rounded-tl-sm bg-secondary/60"
                        )}
                      >
                        {message.parts.map((part, i) => {
                          if (part.type === "text") {
                            return (
                              <MessageResponse
                                key={i}
                                className={cn(
                                  "text-sm leading-relaxed whitespace-pre-wrap",
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
                  ))}
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
                <Message from="assistant" className="mt-3">
                  <MessageContent className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary/60 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </MessageContent>
                </Message>
              )}

              {/* Error message */}
              {error && (
                <Message from="assistant" className="mt-3">
                  <MessageContent className="max-w-[85%] rounded-2xl rounded-tl-sm border border-destructive/20 bg-destructive/10 px-4 py-3">
                    <p className="text-sm text-destructive">
                      Sorry, I encountered an error. Please try again.
                    </p>
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
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the DES program..."
                disabled={isLoading}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:scale-105 hover:shadow-md disabled:scale-100 disabled:opacity-50 disabled:hover:shadow-none"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              AI-powered answers about the DES program
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
