import { useState } from "react";
// @ts-ignore
import { 
  Mail, 
  MessageCircle, 
  Call, 
  Location, 
  Send,
  Clock4,
  Globe
} from "@/assets/index.js";
import { Button } from "@heroui/react";

import TextInput from "@/components/InputController/text-input";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="w-5 h-5" style={{ stroke: "currentColor" }} />,
    title: "Email",
    value: "support@example.com",
    link: "mailto:support@example.com",
  },
  {
    icon: <Call className="w-5 h-5" style={{ stroke: "currentColor" }} />,
    title: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: <MessageCircle className="w-5 h-5" style={{ stroke: "currentColor" }} />,
    title: "Live Chat",
    value: "Available 24/7",
    link: "#",
  },
  {
    icon: <Location className="w-5 h-5" style={{ stroke: "currentColor" }} />,
    title: "Address",
    value: "123 Business St, City, State 12345",
    link: "#",
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      // Handle form submission here
      alert("Thank you for contacting us! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Have a question or need assistance? We're here to help. Fill out the form below or use one of our contact methods.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(value) => handleChange("name", value)}
                  error={errors.name}
                  required
                />
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(value) => handleChange("email", value)}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(value) => handleChange("subject", value)}
                  error={errors.subject}
                  required
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-800">Category</label>
                  <select
                    className={`h-10 px-3 border rounded-lg bg-white transition-all focus-within:ring-1 focus-within:ring-black/40 ${
                      errors.category ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                    }`}
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="account">Account Issues</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-800">Message</label>
                <textarea
                  className={`min-h-[120px] px-3 py-2 border rounded-lg bg-white transition-all focus:ring-1 focus:ring-black/40 resize-none ${
                    errors.message ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                />
                {errors.message && (
                  <p className="text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary-600"
                startContent={<Send className="w-4 h-4" style={{ stroke: "currentColor" }} />}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information Sidebar */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 mb-1">{info.title}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-sm text-gray-900 hover:text-primary transition-colors break-words"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-900 break-words">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock4 className="w-5 h-5 text-primary" style={{ stroke: "currentColor" }} />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Business Hours</h3>
            </div>
            <div className="space-y-3">
              {businessHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-gray-700">{schedule.day}</span>
                  <span className="text-sm text-gray-600">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Need Quick Help?</h3>
            <ul className="space-y-2">
              <li>
                <a href="#knowledge-base" className="text-sm text-gray-700 hover:text-primary transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4" style={{ stroke: "currentColor" }} />
                  Browse Knowledge Base
                </a>
              </li>
              <li>
                <a href="#video-tutorials" className="text-sm text-gray-700 hover:text-primary transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4" style={{ stroke: "currentColor" }} />
                  Watch Video Tutorials
                </a>
              </li>
              <li>
                <a href="#system-status" className="text-sm text-gray-700 hover:text-primary transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4" style={{ stroke: "currentColor" }} />
                  Check System Status
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
