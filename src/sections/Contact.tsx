import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../data/profile';

// Clean SVG brand icons
const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const DribbbleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.312c-.27-.054-2.428-.46-4.708-.216a22.25 22.25 0 0 1-.784-1.872c2.585-1.127 3.447-3.048 3.562-3.224zM12 3.538c2.08 0 3.987.755 5.467 2.01-.137.23-.974 1.547-3.415 2.535a39.81 39.81 0 0 0-3.32-4.41c.414-.09.84-.135 1.268-.135zm-2.825.568c.95 1.258 2.094 2.766 3.245 4.305-1.996.607-4.838 1.096-7.533.896a8.567 8.567 0 0 1 4.288-5.201zM3.538 12c0-.12.006-.237.014-.355 2.72.188 5.795-.297 7.842-.937.228.473.447.954.654 1.442-2.812.87-5.59 3.21-6.93 5.41A8.483 8.483 0 0 1 3.538 12zm8.462 8.462c-2.036 0-3.906-.725-5.37-1.938 1.15-1.87 3.585-3.892 6.27-4.72.84 2.19 1.28 4.335 1.402 5.012-.734.414-1.558.646-2.302.646zm3.843-1.22c-.1-.58-.517-2.617-1.332-4.72 2.148-.258 4.072.164 4.316.22a8.543 8.543 0 0 1-2.984 4.5z"
    />
  </svg>
);

const socialIconMap: Record<string, React.ReactNode> = {
  Linkedin: <LinkedinIcon />,
  Github: <GithubIcon />,
  Dribbble: <DribbbleIcon />,
  Instagram: <InstagramIcon />
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botField: '' // Honeypot field for bot protection
  });

  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'fallback_opened' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerMailtoFallback = (name: string, email: string, subject: string, message: string) => {
    const encodedSubject = encodeURIComponent(
      subject || `Collaboration Inquiry from ${name}`
    );
    const encodedBody = encodeURIComponent(
      `Hi Barira,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    );
    window.location.href = `mailto:${profileData.contactInfo.email}?subject=${encodedSubject}&body=${encodedBody}`;
    setFormStatus('fallback_opened');
    setStatusMessage(
      `Your default email client was opened. If it didn't trigger, please write directly to ${profileData.contactInfo.email}`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: If filled, silently mock success
    if (formData.botField.trim() !== '') {
      setFormStatus('success');
      setStatusMessage('Thank you for reaching out!');
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setStatusMessage('Please fill in your name, email address, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormStatus('error');
      setStatusMessage('Please provide a valid email address.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          botField: formData.botField
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setFormStatus('success');
        setStatusMessage(
          data.message || 'Your message has been sent successfully! I will respond promptly.'
        );
        // Fire confetti celebration
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#8b5cf6', '#ec4899', '#06b6d4', '#f97316']
        });
        // Clear fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          botField: ''
        });
      } else if (data.fallback) {
        // Fall back to direct email client
        triggerMailtoFallback(
          formData.name,
          formData.email,
          formData.subject,
          formData.message
        );
      } else {
        setFormStatus('error');
        setStatusMessage(
          data.message || 'Unable to send message via server. Please try the mailto link below.'
        );
      }
    } catch {
      // Offline / dev server fallback
      triggerMailtoFallback(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-purple-900/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-pink-400 border border-pink-500/30 mb-4"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Have Something Interesting in Mind?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 mt-4 text-base sm:text-lg leading-relaxed font-sans"
          >
            Whether it's machine learning pipelines, full-stack software development, or creative visual collaborations — let's build something remarkable together.
          </motion.p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Hub */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Quick Contact Card */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <h3 className="font-space text-xl font-bold text-white">
                Contact Information
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${profileData.contactInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider block">
                      Direct Email
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {profileData.contactInfo.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {profileData.contactInfo.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Matrix */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10">
              <h4 className="text-xs font-mono-code uppercase text-zinc-400 tracking-wider mb-4 font-semibold">
                Connect on Social Networks
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {profileData.contactInfo.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-white/10 hover:border-pink-500/50 bg-[#161026] hover:bg-[#1a132e] flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-pink-950/40 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-pink-400"
                  >
                    <div className="text-zinc-400 group-hover:text-pink-400 transition-colors mb-2">
                      {socialIconMap[social.platform] || socialIconMap[social.icon]}
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-pink-200 transition-colors">
                      {social.platform}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Serverless Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-space text-2xl font-bold text-white">
                  Send a Message
                </h3>
                <span className="text-[11px] font-mono-code text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  Direct Dispatch
                </span>
              </div>
              <p className="text-zinc-300 text-sm mb-8 font-sans">
                Submit an inquiry directly or request collaboration. Messages are securely routed via modern serverless API.
              </p>

              {/* Status Alert Banner */}
              <div aria-live="polite">
                {formStatus === 'success' && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm font-bold text-emerald-200">
                        Message Dispatched!
                      </strong>
                      {statusMessage}
                    </div>
                  </div>
                )}

                {formStatus === 'fallback_opened' && (
                  <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3 text-xs text-cyan-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm font-bold text-cyan-200">
                        Email Client Triggered
                      </strong>
                      {statusMessage}
                    </div>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-300">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field for bot mitigation (hidden from real users) */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono-code text-zinc-300 uppercase">
                      Your Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Vance"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors focus-visible:ring-1 focus-visible:ring-purple-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono-code text-zinc-300 uppercase">
                      Email Address <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@domain.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors focus-visible:ring-1 focus-visible:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="text-xs font-mono-code text-zinc-300 uppercase">
                    Subject / Area of Interest
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Data Science / Machine Learning / Full-Stack Web Development"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors focus-visible:ring-1 focus-visible:ring-purple-400"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-xs font-mono-code text-zinc-300 uppercase">
                    Your Message <span className="text-pink-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share what you'd like to collaborate on..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors resize-none focus-visible:ring-1 focus-visible:ring-purple-400"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 shadow-xl shadow-pink-600/25 hover:shadow-pink-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
