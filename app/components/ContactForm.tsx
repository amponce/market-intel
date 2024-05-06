"use client";
import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // if any value received in this field, form submission will be ignored.
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset errors
    setErrors({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate fields
    let isValid = true;
    if (!formData.name.trim()) {
      setErrors((errors) => ({ ...errors, name: "Name is required" }));
      isValid = false;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrors((errors) => ({ ...errors, email: "Valid email is required" }));
      isValid = false;
    }
    if (!formData.subject.trim()) {
      setErrors((errors) => ({ ...errors, subject: "Subject is required" }));
      isValid = false;
    }
    if (!formData.message.trim()) {
      setErrors((errors) => ({ ...errors, message: "Message is required" }));
      isValid = false;
    }

    // If validation failed, stop here
    if (!isValid) {
      return;
    }

    // Check if the email field is empty
    if (!formData.email.trim()) {
      // Show an error message or handle the empty email case
      return;
    }

    // Check if the honeypot field is filled
    if (formData.honeypot) {
      // Form submission is spam, do not proceed
      return;
    }

    const response = await fetch("/api/auth/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Email sent successfully") {
          window.location.href = "/details/thank-you"; // Redirect the user
        } else {
          // Handle errors or show a message to the user
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full max-w-[550px] mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Full name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {errors.email && <p className="text-red-500 ">{errors.email}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="subject"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your subject"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {errors.subject && <p className="text-red-500">{errors.subject}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Message
          </label>
          <textarea
            rows={8}
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Type your message"
            className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          ></textarea>
          {errors.message && <p className="text-red-500">{errors.message}</p>}
        </div>
        <input
          type="hidden"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
        />
        <div>
          <button
            className="hover:shadow-form rounded-md bg-indigo-600 opacity-100 py-3 px-8 text-base font-semibold text-white outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
