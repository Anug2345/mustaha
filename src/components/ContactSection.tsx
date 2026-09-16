import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Linkedin, 
  Instagram, 
  Facebook, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, SERVICES } from '../data/portfolioData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    service: preselectedService || 'Administrative Support',
    message: '',
  });

  const [selectedCapacity, setSelectedCapacity] = useState<string>('15-20 hrs/week');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleSelectCapacity = (capacity: string) => {
    setSelectedCapacity(capacity);
    if (!formData.message.trim()) {
      setFormData(prev => ({
        ...prev,
        message: `Hi Zainab, I am exploring administrative support for approximately ${capacity}. Here is what our team needs assistance with: `
      }));
    }
  };

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleCopyEmail = () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(PERSONAL_INFO.email)
          .then(() => {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2500);
          })
          .catch(() => {
            // Fallback for sandboxed iframes
            fallbackCopyText(PERSONAL_INFO.email);
          });
      } else {
        fallbackCopyText(PERSONAL_INFO.email);
      }
    } catch {
      fallbackCopyText(PERSONAL_INFO.email);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // ignore
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief description of what you need assistance with';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please describe your request in at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable inquiry processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `Inquiry: ${formData.service || 'Virtual Assistance'} - ${formData.name || 'Client'}`
  )}&body=${encodeURIComponent(
    `Hello Zainab,\n\nMy name is ${formData.name}.\n\nService needed: ${formData.service}\n\nProject details:\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
  )}`;

  return (
    <section id="contact" className="py-16 md:py-28 bg-[#F4F6F2]/80 dark:bg-[#111413] border-t border-[#E2DFD8] dark:border-[#27322A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E8EDE3] dark:bg-[#1F2922] text-[#556447] dark:text-[#AEC89B] text-xs font-bold tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] dark:text-[#F3F6F2] tracking-tight">
            Let's Make Your Workday More Organized.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] dark:text-[#A8B3A7] leading-relaxed">
            Need dependable support with administrative tasks, research, data organization, scheduling, or everyday business operations? Let's connect.
          </p>
        </div>

        {/* Quick Direct Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a
            id="contact-email-me-btn"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F2937] dark:bg-[#8FA67C] hover:bg-[#7C8F6A] dark:hover:bg-[#9EBA8B] text-white dark:text-[#111413] text-sm sm:text-base font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me Directly</span>
          </a>

          <a
            id="contact-linkedin-btn"
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#181D1A] hover:bg-[#F8F7F4] dark:hover:bg-[#202723] border border-[#D3DCCB] dark:border-[#2E3C32] text-[#1F2937] dark:text-[#F3F6F2] text-sm sm:text-base font-semibold shadow-2xs hover:shadow-xs transition-all"
          >
            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 text-[#6B7280] dark:text-[#869485]" />
          </a>
        </div>

        {/* Main 2-Column Contact Block */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Direct Info & Social Links */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">

            {/* Zainab Direct Profile Badge */}
            <div className="bg-white dark:bg-[#181D1A] rounded-2xl p-4 sm:p-5 border border-[#E2DFD8] dark:border-[#27322A] shadow-2xs flex items-center gap-3.5 sm:gap-4">
              <div className="relative shrink-0">
                <img
                  src="/zainab.jpg"
                  alt="Mustapha Zainab Olabimpe"
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover object-top border border-[#D3DCCB] dark:border-[#2E3C32] shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#7C8F6A] border-2 border-white dark:border-[#181D1A]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-[#1F2937] dark:text-[#F3F6F2]">Mustapha Zainab Olabimpe</h4>
                </div>
                <p className="text-xs text-[#6B7280] dark:text-[#869485] mt-0.5">
                  Certified Virtual Assistant • Typically responds within 24 hours
                </p>
              </div>
            </div>
            
            {/* Direct Email Card with One-Click Copy */}
            <div
              id="contact-direct-email-card"
              className="bg-white dark:bg-[#181D1A] rounded-2xl p-5 sm:p-7 border border-[#E2DFD8] dark:border-[#27322A] shadow-2xs"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#869485]">
                Direct Email Address
              </span>
              <p className="mt-2 text-sm sm:text-lg font-bold text-[#1F2937] dark:text-[#F3F6F2] break-all">
                {PERSONAL_INFO.email}
              </p>
              
              <div className="mt-4 pt-4 border-t border-[#E2DFD8] dark:border-[#27322A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                <button
                  id="copy-email-address-btn"
                  onClick={handleCopyEmail}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8F7F4] dark:bg-[#202723] hover:bg-[#E8EDE3] dark:hover:bg-[#28352b] text-xs font-semibold text-[#1F2937] dark:text-[#F3F6F2] border border-[#E2DFD8] dark:border-[#2E3C32] transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#7C8F6A] dark:text-[#8FA67C]" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#869485]" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs font-semibold text-[#7C8F6A] dark:text-[#8FA67C] hover:underline text-center sm:text-right py-1"
                >
                  Open Mail Client →
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="bg-white dark:bg-[#181D1A] rounded-2xl p-5 sm:p-7 border border-[#E2DFD8] dark:border-[#27322A] shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#869485]">
                Professional & Social Profiles
              </span>

              <div className="mt-4 space-y-2.5 sm:space-y-3">
                <a
                  id="social-link-linkedin"
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#141816] hover:bg-[#E8EDE3]/70 dark:hover:bg-[#202723] border border-[#E2DFD8] dark:border-[#27322A] transition-colors group min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2]">LinkedIn</p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#869485]">zainab-mustapha</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6B7280] dark:text-[#869485] group-hover:text-[#1F2937] dark:group-hover:text-[#F3F6F2] transition-colors shrink-0" />
                </a>

                <a
                  id="social-link-instagram"
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#141816] hover:bg-[#E8EDE3]/70 dark:hover:bg-[#202723] border border-[#E2DFD8] dark:border-[#27322A] transition-colors group min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2]">Instagram</p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#869485]">@yourgirlbimpe</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6B7280] dark:text-[#869485] group-hover:text-[#1F2937] dark:group-hover:text-[#F3F6F2] transition-colors shrink-0" />
                </a>

                <a
                  id="social-link-facebook"
                  href={PERSONAL_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#141816] hover:bg-[#E8EDE3]/70 dark:hover:bg-[#202723] border border-[#E2DFD8] dark:border-[#27322A] transition-colors group min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center shrink-0">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2]">Facebook</p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#869485]">Zainab Mustapha</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6B7280] dark:text-[#869485] group-hover:text-[#1F2937] dark:group-hover:text-[#F3F6F2] transition-colors shrink-0" />
                </a>
              </div>
            </div>

            {/* Availability Commitment Card */}
            <div className="bg-[#1F2937] dark:bg-[#181D1A] text-white rounded-2xl p-5 sm:p-6 border border-white/10 dark:border-[#27322A] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7C8F6A] dark:text-[#8FA67C] uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4" />
                Response Commitment
              </div>
              <p className="text-sm font-semibold text-stone-200">
                Prompt & Dependable Communication
              </p>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                Inquiries typically receive a response within 24 hours during standard business days.
              </p>
            </div>

          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              id="contact-form-container"
              className="bg-white dark:bg-[#181D1A] rounded-2xl p-4 sm:p-8 border border-[#E2DFD8] dark:border-[#27322A] shadow-sm"
            >
              {isSuccess ? (
                <div id="contact-form-success" className="py-8 text-center animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#E8EDE3] dark:bg-[#1F2922] text-[#556447] dark:text-[#AEC89B] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937] dark:text-[#F3F6F2]">
                    Inquiry Prepared Successfully!
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] dark:text-[#A8B3A7] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#1F2937] dark:text-[#F3F6F2]">{formData.name}</span>. Your request regarding <span className="font-semibold text-[#1F2937] dark:text-[#F3F6F2]">{formData.service}</span> has been logged.
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-[#F8F7F4] dark:bg-[#141816] border border-[#E2DFD8] dark:border-[#27322A] text-left max-w-md mx-auto">
                    <p className="text-xs font-semibold text-[#6B7280] dark:text-[#869485] uppercase">Inquiry Summary:</p>
                    <p className="text-xs text-[#1F2937] dark:text-[#F3F6F2] mt-1 font-medium">From: {formData.email}</p>
                    <p className="text-xs text-[#4B5563] dark:text-[#A8B3A7] mt-2 italic line-clamp-3">"{formData.message}"</p>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      id="direct-send-email-btn"
                      href={mailtoLink}
                      className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F2937] dark:bg-[#8FA67C] hover:bg-[#7C8F6A] dark:hover:bg-[#9EBA8B] text-white dark:text-[#111413] text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email Client</span>
                    </a>

                    <button
                      id="reset-inquiry-form-btn"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          service: 'Administrative Support',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F8F7F4] dark:bg-[#202723] hover:bg-[#E8EDE3] dark:hover:bg-[#28352b] text-xs font-semibold text-[#1F2937] dark:text-[#F3F6F2] border border-[#E2DFD8] dark:border-[#2E3C32] transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form id="portfolio-contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="border-b border-[#E2DFD8] dark:border-[#27322A] pb-4 mb-5 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] dark:text-[#F3F6F2]">
                      Send a Message or Project Brief
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#869485] mt-1">
                      Fill out the details below and I'll get back to you with next steps.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2] uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full min-h-[44px] px-4 py-2.5 sm:py-3 rounded-xl border text-sm text-[#1F2937] dark:text-[#F3F6F2] bg-[#F8F7F4] dark:bg-[#141816] focus:bg-white dark:focus:bg-[#181D1A] focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#E2DFD8] dark:border-[#27322A] focus:border-[#7C8F6A] dark:focus:border-[#8FA67C] focus:ring-1 focus:ring-[#7C8F6A]'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2] uppercase tracking-wider mb-1.5">
                        Your Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="e.g. sarah@yourcompany.com"
                        className={`w-full min-h-[44px] px-4 py-2.5 sm:py-3 rounded-xl border text-sm text-[#1F2937] dark:text-[#F3F6F2] bg-[#F8F7F4] dark:bg-[#141816] focus:bg-white dark:focus:bg-[#181D1A] focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#E2DFD8] dark:border-[#27322A] focus:border-[#7C8F6A] dark:focus:border-[#8FA67C] focus:ring-1 focus:ring-[#7C8F6A]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Service Needed Dropdown */}
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2] uppercase tracking-wider mb-1.5">
                        Service Needed
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full min-h-[44px] px-4 py-2.5 sm:py-3 rounded-xl border border-[#E2DFD8] dark:border-[#27322A] text-sm text-[#1F2937] dark:text-[#F3F6F2] bg-[#F8F7F4] dark:bg-[#141816] focus:bg-white dark:focus:bg-[#181D1A] focus:outline-none focus:border-[#7C8F6A] dark:focus:border-[#8FA67C] focus:ring-1 focus:ring-[#7C8F6A] transition-colors cursor-pointer"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Custom Project / Multiple Services">
                          Custom Project / Multiple Services
                        </option>
                        <option value="Internship / Entry-Level Role">
                          Internship / Entry-Level Role
                        </option>
                      </select>
                    </div>

                    {/* Interactive Engagement Capacity Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2] uppercase tracking-wider">
                          Desired Engagement Capacity
                        </label>
                        <span className="text-[11px] text-[#556447] dark:text-[#AEC89B] font-semibold">
                          Flexible Scheduling
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { id: '5-10 hrs/week', label: '5–10 hrs/wk', desc: 'Light Assist' },
                          { id: '15-20 hrs/week', label: '15–20 hrs/wk', desc: 'Active Ops' },
                          { id: 'Full Sprint / Custom', label: 'Project Sprint', desc: 'One-off / Board' }
                        ].map(cap => (
                          <button
                            type="button"
                            key={cap.id}
                            onClick={() => handleSelectCapacity(cap.id)}
                            className={`min-h-[44px] p-2.5 sm:p-2 rounded-xl text-left border transition-all cursor-pointer ${
                              selectedCapacity === cap.id
                                ? 'bg-[#E8EDE3] dark:bg-[#222C26] border-[#7C8F6A] dark:border-[#8FA67C] text-[#1F2937] dark:text-[#F3F6F2] shadow-2xs ring-1 ring-[#7C8F6A]/30'
                                : 'bg-[#F8F7F4] dark:bg-[#141816] border-[#E2DFD8] dark:border-[#27322A] text-[#4B5563] dark:text-[#A8B3A7] hover:border-[#7C8F6A]/50'
                            }`}
                          >
                            <span className="block text-xs font-bold leading-tight">{cap.label}</span>
                            <span className="block text-[10px] text-[#6B7280] dark:text-[#869485] mt-0.5">{cap.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold text-[#1F2937] dark:text-[#F3F6F2] uppercase tracking-wider mb-1.5">
                        Message / Project Scope <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Tell me a bit about your current workflow bottlenecks, upcoming project deadlines, or the administrative support you are looking for..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1F2937] dark:text-[#F3F6F2] bg-[#F8F7F4] dark:bg-[#141816] focus:bg-white dark:focus:bg-[#181D1A] focus:outline-none transition-colors resize-none ${
                          errors.message
                            ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#E2DFD8] dark:border-[#27322A] focus:border-[#7C8F6A] dark:focus:border-[#8FA67C] focus:ring-1 focus:ring-[#7C8F6A]'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[44px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F2937] dark:bg-[#8FA67C] hover:bg-[#7C8F6A] dark:hover:bg-[#9EBA8B] text-white dark:text-[#111413] text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Sending Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
