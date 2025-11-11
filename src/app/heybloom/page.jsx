"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Loader2,
  MessageCircle,
  RotateCcw,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const STORAGE_KEY = "heybloom-chat-history-v1";

const MAX_INPUT_LENGTH = 8000;

const QUICK_PROMPTS = [
  {
    id: "study-method",
    title: "Metodo di studio personalizzato",
    prompt:
      "Puoi suggerire un metodo di studio personalizzato per una studentessa di terza media che fa fatica a mantenere la concentrazione?",
  },
  {
    id: "family-support",
    title: "Supporto per genitori",
    prompt:
      "Sono un genitore di un bambino con diagnosi ADHD: quali azioni quotidiane posso mettere in campo per sostenerlo nello studio?",
  },
  {
    id: "emotion-management",
    title: "Gestione ansia da esame",
    prompt:
      "Ho uno studente che teme gli esami orali. Puoi darmi una routine pratica per aiutarlo a gestire l'ansia?",
  },
  {
    id: "labs",
    title: "Idee per laboratori",
    prompt:
      "Vorrei organizzare un laboratorio creativo per un gruppo di ragazzi delle superiori: che attività posso proporre per sviluppare pensiero critico e collaborazione?",
  },
];

const createInitialMessages = () => [
  {
    id: "assistant-welcome",
    role: "assistant",
    content:
      "Ciao! Sono HeyBloom, l'assistente AI di Bloom. Raccontami di cosa hai bisogno e ti aiuterò con consigli pratici per studenti, genitori ed educatori.",
    status: "resolved",
    createdAt: Date.now(),
  },
];

const sanitizeForStorage = (messages) =>
  messages.map(({ id, role, content, status, createdAt }) => ({
    id,
    role,
    content,
    status,
    createdAt,
  }));

const loadStoredMessages = () => {
  if (typeof window === "undefined") {
    return createInitialMessages();
  }

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createInitialMessages();
    }

    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((message) => ({
        ...message,
        createdAt: message.createdAt || Date.now(),
        status: message.status || "resolved",
      }));
    }
  } catch (error) {
    console.error("[HeyBloom] Failed to load chat history", error);
  }

  return createInitialMessages();
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";
  const bubbleStyles = isUser
    ? "bg-[#008C95] text-white"
    : "bg-white/90 text-slate-800 border border-[#008C95]/20";

  const alignment = isUser ? "items-end" : "items-start";

  const renderContent = useMemo(() => {
    if (message.status === "pending") {
      return (
        <div className="flex items-center gap-2 text-sm text-[#008C95]">
          <Loader2 className="h-4 w-4 animate-spin" />
          HeyBloom sta pensando...
        </div>
      );
    }

    const lines = (message.content || "").split(/\n+/);

    return lines.map((line, index) => (
      <p key={`${message.id}-${index}`} className="leading-relaxed">
        {line.trim()}
      </p>
    ));
  }, [message]);

  return (
    <div className={`flex ${alignment} w-full`}> 
      <div
        className={`max-w-[90%] md:max-w-[75%] rounded-3xl px-5 py-4 shadow-sm transition-shadow duration-200 ${bubbleStyles}`}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide mb-2 opacity-70">
          {isUser ? "Tu" : "HeyBloom"}
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
          <span>
            {new Intl.DateTimeFormat("it-IT", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(message.createdAt || Date.now())}
          </span>
        </div>
        <div className="space-y-2 text-sm md:text-base font-medium">
          {renderContent}
        </div>
        {message.status === "error" && (
          <div className="mt-3 text-xs text-red-500">
            Non sono riuscita a rispondere correttamente. Riprova più tardi.
          </div>
        )}
      </div>
    </div>
  );
};

export default function HeyBloomPage() {
  const [messages, setMessages] = useState(loadStoredMessages);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [usage, setUsage] = useState(null);
  const [modelName, setModelName] = useState(null);

  const messageListRef = useRef(null);
  const idCounterRef = useRef(0);

  const createMessageId = useCallback((prefix) => {
    idCounterRef.current += 1;
    return `${prefix}-${Date.now()}-${idCounterRef.current}`;
  }, []);

  useEffect(() => {
    try {
      const sanitized = sanitizeForStorage(messages);
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    } catch (error) {
      console.error("[HeyBloom] Failed to persist chat history", error);
    }
  }, [messages]);

  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleResetConversation = useCallback(() => {
    const initial = createInitialMessages();
    setMessages(initial);
    setUsage(null);
    setErrorMessage(null);
    setInputValue("");
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch (error) {
      console.error("[HeyBloom] Failed to reset chat storage", error);
    }
  }, []);

  const handleSendMessage = useCallback(
    async (rawContent) => {
      const textToSend = (rawContent ?? inputValue).trim();
      const truncatedText = textToSend.slice(0, MAX_INPUT_LENGTH);

      if (!truncatedText || isSending) {
        return;
      }

      setInputValue("");
      setErrorMessage(null);

      const timestamp = Date.now();
      const userMessage = {
        id: createMessageId("user"),
        role: "user",
        content: truncatedText,
        status: "resolved",
        createdAt: timestamp,
      };

      const assistantPlaceholder = {
        id: createMessageId("assistant"),
        role: "assistant",
        content: "",
        status: "pending",
        createdAt: timestamp,
      };

      const conversationPayload = [
        ...messages
          .filter((message) => message.content && message.content.trim().length > 0)
          .map((message) => ({ role: message.role, content: message.content })),
        { role: "user", content: truncatedText },
      ];

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setIsSending(true);
      setUsage(null);
      setModelName(null);

      try {
        const response = await fetch("/api/heybloom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: conversationPayload }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Non sono riuscita a completare la richiesta.");
        }

        setUsage(data?.usage || null);
        setModelName(data?.model || null);

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantPlaceholder.id
              ? {
                  ...message,
                  content: data.reply,
                  status: "resolved",
                  createdAt: Date.now(),
                }
              : message
          )
        );
      } catch (error) {
        console.error("[HeyBloom] Chat error", error);
        setErrorMessage(error.message || "Si è verificato un errore inatteso.");
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantPlaceholder.id
              ? {
                  ...message,
                  content:
                    "Ops! Qualcosa è andato storto mentre preparavo la risposta. Prova di nuovo tra qualche istante.",
                  status: "error",
                }
              : message
          )
        );
      } finally {
        setIsSending(false);
      }
    },
    [createMessageId, inputValue, isSending, messages]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const lastUpdated = useMemo(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return null;
    return new Intl.DateTimeFormat("it-IT", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(lastMessage.createdAt || Date.now());
  }, [messages]);

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e6fbfb] via-white to-white" />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#008C95]/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-[#008C95]">
              <Sparkles className="h-4 w-4" />
              Novità Bloom
            </span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              HeyBloom &mdash; l'assistente AI per crescere insieme
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Conversa con HeyBloom per ricevere idee, strategie e strumenti pratici ispirati al metodo Bloom. Parla di studio, benessere emotivo, coinvolgimento dei genitori e percorsi educativi su misura.
            </p>
          </div>

          <div className="self-start rounded-2xl border border-[#008C95]/20 bg-white/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#008C95]">
              <ShieldCheck className="h-4 w-4" />
              Conversazioni riservate
            </div>
            <p className="mt-2 max-w-xs text-xs text-slate-600">
              I messaggi servono solo a generare risposte in tempo reale. Nessun dato viene salvato sui server Bloom.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => handleSendMessage(prompt.prompt)}
              disabled={isSending}
              className="group flex items-center gap-2 rounded-full border border-[#008C95]/30 bg-white/70 px-4 py-2 text-sm font-medium text-[#008C95] shadow-sm transition-all hover:border-[#008C95] hover:bg-[#008C95] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
              {prompt.title}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-[#008C95]/20 bg-white/70 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-[#008C95]/10 px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-[#008C95]">Conversazione con HeyBloom</p>
              {lastUpdated && (
                <p className="text-xs text-slate-500">Ultimo aggiornamento: {lastUpdated}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleResetConversation}
              className="inline-flex items-center gap-2 rounded-full border border-[#008C95]/20 px-3 py-1.5 text-xs font-semibold text-[#008C95] transition hover:border-[#008C95]/40 hover:bg-[#008C95]/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Nuova chat
            </button>
          </div>

          <div
            ref={messageListRef}
            className="h-[50vh] w-full overflow-y-auto px-4 py-6 md:h-[55vh] md:px-6"
          >
            <div className="flex flex-col gap-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>

          <div className="border-t border-[#008C95]/10 bg-white/70 px-4 py-4 md:px-6">
            {errorMessage && (
              <div className="mb-3 rounded-xl border border-red-200 bg-red-50/80 px-4 py-2 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="flex items-end gap-3">
              <div className="flex-1 rounded-2xl border border-[#008C95]/20 bg-white px-4 py-2 shadow-inner focus-within:border-[#008C95]/60">
                <textarea
                  rows={1}
                  value={inputValue}
                  onChange={(event) => {
                    const { value } = event.target;
                    if (value.length <= MAX_INPUT_LENGTH) {
                      setInputValue(value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Scrivi il tuo messaggio..."
                  className="h-16 w-full resize-none border-0 bg-transparent text-sm outline-none placeholder:text-slate-400 md:text-base"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Premi Invio per inviare &bull; Maiusc + Invio per andare a capo</span>
                  <span>{inputValue.length}/{MAX_INPUT_LENGTH}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isSending || inputValue.trim().length === 0}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#008C95] text-white shadow-lg transition hover:bg-[#006c71] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <SendHorizontal className="h-5 w-5" />
                )}
              </button>
            </div>

            {usage && (
              <p className="mt-3 text-xs text-slate-500">
                Ultima risposta generata con {usage.completion_tokens ?? "-"} token.
                {" "}
                {modelName && <span>Modello: {modelName}</span>}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#008C95]/20 bg-white/80 px-6 py-4 text-sm text-slate-600 shadow-sm">
          <p>
            HeyBloom offre suggerimenti educativi basati su linee guida generali. Non sostituisce il confronto con un professionista. Per situazioni urgenti o delicate contatta direttamente il team Bloom.
          </p>
        </div>
      </div>
    </section>
  );
}

