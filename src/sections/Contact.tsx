import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
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
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'ready_to_send' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please fill in your name, email address, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setFormStatus('submitting');

    // Mailto fallback packaging
    setTimeout(() => {
      const subject = encodeURIComponent(formData.subject || `Collaboration Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Barira,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
      );

      // Trigger user's email client directly
      window.location.href = `mailto:${profileData.contactInfo.email}?subject=${subject}&body=${body}`;
      setFormStatus('ready_to_send');
    }, 600);
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
            Let's connect, collaborate and create something meaningful.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Primary Contact Card */}
            <div className="rounded-3xl glass-panel border border-white/10 p-8 space-y-6">
              <div>
                <h3 className="font-space text-2xl font-bold text-white mb-2">
                  Direct Inquiries
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Whether discussing a Data Science challenge, an ambitious Web Development project, or keynote event photography coverage—my inbox is open.
                </p>
              </div>

              {/* Email Block */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-mono-code text-zinc-400 uppercase">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${profileData.contactInfo.email}`}
                    className="block text-sm sm:text-base font-semibold text-white hover:text-pink-400 transition-colors truncate"
                  >
                    {profileData.contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Location Block */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono-code text-zinc-400 uppercase">
                    Location
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {profileData.contactInfo.location}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{profileData.contactInfo.availability}</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="rounded-3xl glass-panel border border-white/10 p-6">
              <h4 className="font-space text-sm font-bold text-white uppercase tracking-wider mb-4">
                Connect on Social Networks
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {profileData.contactInfo.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-white/10 hover:border-pink-500/50 bg-[#161026] hover:bg-[#1a132e] flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-pink-950/40 hover:scale-[1.03]"
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

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-10">
              <h3 className="font-space text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-zinc-300 text-sm mb-8 font-sans">
                Fill in the details below. This will launch your email client preloaded with your inquiry.
              </p>

              {/* Status Alert Banner */}
              {formStatus === 'ready_to_send' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-emerald-200">
                      Email Dispatch Prepared!
                    </strong>
                    Your mail client has been opened with your prefilled message. If it didn't trigger automatically, feel free to email directly at <code className="text-white font-bold">{profileData.contactInfo.email}</code>.
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-300">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors"
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
                    placeholder="e.g. Data Analytics / Web Collaboration / Event Photography"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-white text-sm placeholder:text-zinc-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 shadow-xl shadow-pink-600/25 hover:shadow-pink-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{formStatus === 'submitting' ? 'Preparing Email...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
