"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MessageCircle, ArrowLeft, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:velora@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-16 text-[#292421] md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[#926B70] hover:text-[#48252F]"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mb-14 text-center">
          <p className="mb-4 text-xs tracking-[0.3em] text-[#926B70]">
            WE WOULD LOVE TO HEAR FROM YOU
          </p>

          <h1 className="font-serif text-5xl text-[#48252F] md:text-6xl">
            Get in Touch
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#766D68]">
            Have a question about an order, need styling assistance, or simply
            want to say hello? We're here to help.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact information */}
          <section>
            <h2 className="mb-7 font-serif text-2xl text-[#48252F]">
              Contact Information
            </h2>

            <div className="space-y-7">
              <a
                href="mailto:velora@gmail.com"
                className="flex items-start gap-4"
              >
                <span className="rounded-full bg-[#EEE7E2] p-3">
                  <Mail size={20} />
                </span>

                <div>
                  <p className="mb-1 text-sm font-medium">Email</p>
                  <p className="text-sm text-[#766D68]">velora@gmail.com</p>
                </div>
              </a>

              <a href="tel:09074218826" className="flex items-start gap-4">
                <span className="rounded-full bg-[#EEE7E2] p-3">
                  <Phone size={20} />
                </span>

                <div>
                  <p className="mb-1 text-sm font-medium">Phone</p>
                  <p className="text-sm text-[#766D68]">0907 421 8826</p>
                </div>
              </a>

              <a
                href="https://wa.me/2349074218826"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4"
              >
                <span className="rounded-full bg-[#EEE7E2] p-3">
                  <MessageCircle size={20} />
                </span>

                <div>
                  <p className="mb-1 text-sm font-medium">WhatsApp</p>
                  <p className="text-sm text-[#766D68]">
                    Chat with us directly
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-12 border-t border-[#E7DED8] pt-7">
              <p className="font-serif text-xl text-[#48252F]">VÉLORA</p>
              <p className="mt-2 text-xs tracking-widest text-[#926B70]">
                STYLE WITHOUT BOUNDARIES.
              </p>
            </div>
          </section>

          {/* Contact form */}
          <section className="bg-white p-7 shadow-sm md:p-9">
            <h2 className="mb-7 font-serif text-2xl text-[#48252F]">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs">Full Name</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-[#E7DED8] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#926B70]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#E7DED8] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#926B70]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs">Subject</label>
                <input
                  required
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  className="w-full border border-[#E7DED8] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#926B70]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs">Message</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-none border border-[#E7DED8] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#926B70]"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-[#48252F] px-6 py-4 text-xs tracking-[0.2em] text-white transition hover:bg-[#68404A]"
              >
                SEND MESSAGE
                <Send size={15} />
              </button>

              <p className="text-xs leading-5 text-[#8A817B]">
                Sending opens your email application with your message ready to
                send. This demo does not submit messages to a server.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
