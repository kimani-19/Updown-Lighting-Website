import React, { useState } from 'react';

const allowedServices = [
  'Residential Installation',
  'Maintenance and Removal',
  'Custom Design',
  'Consultation Only',
];

const initialData = {
  full_name: '',
  email_address: '',
  phone_number: '',
  property_address: '',
  service_type: '',
  additional_details: '',
};

const quoteIcons = {
  person: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  email: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  phone: (
    <path d="M7.2 3.8 4.5 5.2c-.9.5-1.3 1.6-.9 2.6 2.3 5.4 6.6 9.7 12 12 .9.4 2 .1 2.6-.9l1.4-2.7-4.1-2.3-1.8 2a15.4 15.4 0 0 1-6.7-6.7l2-1.8-2.3-4.1Z" />
  ),
  service: (
    <>
      <path d="m12 3-5 6h3l-5 6h4l-3 4h12l-3-4h4l-5-6h3l-5-6Z" />
      <path d="M12 19v3" />
    </>
  ),
  location: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  message: (
    <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8 8 0 0 1-4-.9L4 20l1.5-3.4A7.3 7.3 0 0 1 4 12c0-4.2 3.6-7.5 8-7.5s8 2.8 8 7Z" />
  ),
  document: (
    <>
      <path d="M6 3.5h8l4.5 4.5v12A1.5 1.5 0 0 1 17 21.5H6A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M14 4v4h4M8 13h8M8 17h6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1 8 4.5-2.5 4.5 2.5-1-8" />
    </>
  ),
  handshake: (
    <>
      <path d="m3 9 4-4 5 2 5-2 4 4-3 3-3-2-3 3-3-2-3 2-3-4Z" />
      <path d="m7 13 3 3 2-1 2 2 2-1 2 1 3-4M7 5l-2-2M17 5l2-2" />
    </>
  ),
};

const QuoteIcon = ({ name, className }) => (
  <svg
    className={className}
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {quoteIcons[name]}
  </svg>
);

const QuoteForm = () => {
  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit your request.');
      }

      setFormData(initialData);
      setStatus({ type: 'success', message: result.message });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit your request.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="full_name">
            Full name <span className="quote-required" aria-hidden="true">*</span>
          </label>
          <div className="quote-input-wrap">
            <QuoteIcon name="person" className="quote-field-icon" />
            <input
              id="full_name"
              className="form-input"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              maxLength={150}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email_address">
            Email address <span className="quote-required" aria-hidden="true">*</span>
          </label>
          <div className="quote-input-wrap">
            <QuoteIcon name="email" className="quote-field-icon" />
            <input
              id="email_address"
              className="form-input"
              name="email_address"
              type="text"
              inputMode="email"
              placeholder="Enter your email address"
              value={formData.email_address}
              onChange={handleChange}
              maxLength={254}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="phone_number">
            Phone number <span className="quote-required" aria-hidden="true">*</span>
          </label>
          <div className="quote-input-wrap">
            <QuoteIcon name="phone" className="quote-field-icon" />
            <input
              id="phone_number"
              className="form-input"
              name="phone_number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={handleChange}
              maxLength={30}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="service_type">
            Service type <span className="quote-required" aria-hidden="true">*</span>
          </label>
          <div className="quote-input-wrap quote-select-wrap">
            <QuoteIcon name="service" className="quote-field-icon" />
            <select
              id="service_type"
              className="form-select"
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              {allowedServices.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <QuoteIcon name="chevron" className="quote-select-chevron" />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="property_address">
          Property address <span className="quote-required" aria-hidden="true">*</span>
        </label>
        <div className="quote-input-wrap">
          <QuoteIcon name="location" className="quote-field-icon" />
          <input
            id="property_address"
            className="form-input"
            name="property_address"
            placeholder="Enter your property address"
            value={formData.property_address}
            onChange={handleChange}
            maxLength={500}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="additional_details">Additional details</label>
        <div className="quote-input-wrap quote-textarea-wrap">
          <QuoteIcon name="message" className="quote-field-icon" />
          <textarea
            id="additional_details"
            className="form-textarea"
            name="additional_details"
            placeholder="Tell us about your project, preferred timeline, or any special requests..."
            value={formData.additional_details}
            onChange={handleChange}
            maxLength={3000}
          />
        </div>
      </div>

      {status.message && (
        <p
          className={status.type === 'success' ? 'form-success' : 'form-error'}
          role={status.type === 'success' ? 'status' : 'alert'}
        >
          {status.message}
        </p>
      )}

      <button className="btn btn-primary quote-submit-button" type="submit" disabled={submitting}>
        <QuoteIcon name="document" className="quote-submit-icon" />
        <span>{submitting ? 'Submitting...' : 'Request a Free Quote'}</span>
        <QuoteIcon name="arrow" className="quote-submit-arrow" />
      </button>

      <ul className="quote-reassurances" aria-label="What to expect">
        <li className="quote-reassurance">
          <QuoteIcon name="bolt" className="quote-reassurance-icon" />
          <span>
            <strong>Quick Response</strong>
            <span>We'll get back to you soon</span>
          </span>
        </li>
        <li className="quote-reassurance">
          <QuoteIcon name="award" className="quote-reassurance-icon" />
          <span>
            <strong>Professional Installation</strong>
            <span>Quality and safety you can trust</span>
          </span>
        </li>
        <li className="quote-reassurance">
          <QuoteIcon name="handshake" className="quote-reassurance-icon" />
          <span>
            <strong>No-Obligation Quote</strong>
            <span>Get your estimate today</span>
          </span>
        </li>
      </ul>
    </form>
  );
};

export default QuoteForm;
