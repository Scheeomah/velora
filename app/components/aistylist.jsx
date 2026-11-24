"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function AIStylist({ products, onAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to VÉLORA! I'm your personal style assistant. Whether you're looking for everyday essentials, a statement outfit or something for a special occasion, tell me your style preferences and budget. Let's find something that feels like you.",
    },
  ]);

  const formatPrice = (price) => `₦${Number(price).toLocaleString("en-NG")}`;

  // Find products based on the customer's preferences

  const getRecommendations = (message) => {
    const text = message.toLowerCase();

    let category = null;

    if (text.includes("dress")) {
      category = "Dresses";
    } else if (
      text.includes("blazer") ||
      text.includes("jacket") ||
      text.includes("formal")
    ) {
      category = "Ready to Wear";
    } else if (
      text.includes("co-ord") ||
      text.includes("coord") ||
      text.includes("two piece") ||
      text.includes("two-piece")
    ) {
      category = "Co-ords";
    } else if (
      text.includes("shirt") ||
      text.includes("basic") ||
      text.includes("everyday")
    ) {
      category = "Essentials";
    }

    // Detect a budget, e.g. ₦50,000 or 50k

    const budgetMatch = text.match(/(?:₦|n)?\s*([\d,]+)\s*(k)?/i);

    let budget = null;

    if (budgetMatch) {
      budget = Number(budgetMatch[1].replace(/,/g, ""));

      if (budgetMatch[2]) {
        budget *= 1000;
      }
    }

    let recommendations = products.filter((product) => {
      const matchesCategory = !category || product.category === category;

      const matchesBudget = !budget || Number(product.price) <= budget;

      return matchesCategory && matchesBudget;
    });

    // If no products match both filters, try the budget alone

    if (recommendations.length === 0 && budget) {
      recommendations = products.filter(
        (product) => Number(product.price) <= budget,
      );
    }

    return recommendations.slice(0, 3);
  };

  // Send customer message

  const sendMessage = (event) => {
    event.preventDefault();

    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    const recommendations = getRecommendations(userMessage);

    const response =
      recommendations.length > 0
        ? "I've found a few pieces that match your style preferences! Take a look:"
        : "I couldn't find an exact match just yet. Try adjusting your budget or asking for dresses, co-ords, shirts or ready-to-wear pieces.";

    setMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        text: response,
        recommendations,
      },
    ]);
  };

  return (
    <>
      {/* Floating AI Stylist Button */}

      <button
        id="ai-stylist-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open VÉLORA Stylist"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#48252F] text-white shadow-xl transition hover:scale-105"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}

      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[580px] w-[calc(100%-40px)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-[#E8DDD8] bg-[#FAF8F5] shadow-2xl">
          {/* Header */}

          <div className="flex items-center justify-between bg-[#48252F] p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Sparkles size={20} />
              </div>

              <div>
                <h3 className="font-serif text-lg">VÉLORA Stylist</h3>

                <p className="text-xs text-white/70">
                  Your personal style assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close stylist"
              className="rounded-full p-2 transition hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-none bg-[#48252F] text-white"
                      : "rounded-bl-none border border-[#E8DDD8] bg-white text-[#292421]"
                  }`}
                >
                  <p>{message.text}</p>

                  {/* Product Recommendations */}

                  {message.recommendations && (
                    <div className="mt-3 space-y-3">
                      {message.recommendations.map((product) => (
                        <div
                          key={product.id}
                          className="overflow-hidden rounded-xl border border-[#E8DDD8] bg-[#FAF8F5]"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-32 w-full object-cover"
                          />

                          <div className="p-3">
                            <h4 className="font-medium text-[#48252F]">
                              {product.name}
                            </h4>

                            <p className="mt-1 text-xs text-gray-600">
                              {formatPrice(product.price)}
                            </p>

                            <button
                              onClick={() => onAddToCart(product)}
                              className="mt-3 w-full bg-[#48252F] py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#68404A]"
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-[#E8DDD8] bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tell me what you're looking for..."
              className="min-w-0 flex-1 rounded-full bg-[#F5F0EC] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#926B70]"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#48252F] text-white transition hover:bg-[#68404A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>

          <p className="bg-white pb-3 text-center text-[10px] text-gray-400">
            VÉLORA Style Assistant · Demo Version
          </p>
        </div>
      )}
    </>
  );
}
