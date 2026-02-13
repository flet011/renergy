import { useState } from 'react';
import { X, Send, Calendar, MessageSquare, CheckCircle } from 'lucide-react';

const FORM_TYPES = {
  quote: {
    title: 'Request a Quote',
    icon: Send,
    fields: [
      { name: 'company', label: 'Company Name', type: 'text', required: true },
      { name: 'name', label: 'Your Name', type: 'text', required: true },
      { name: 'email', label: 'Work Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: false },
      { name: 'capacity', label: 'Required Capacity (kW)', type: 'number', required: true },
      { name: 'timeline', label: 'Deployment Timeline', type: 'select', options: ['Immediate (< 30 days)', '1-3 months', '3-6 months', '6-12 months', '12+ months'], required: true },
      { name: 'requirements', label: 'Special Requirements', type: 'textarea', placeholder: 'Liquid cooling, DGX-ready, specific compliance (SOC2, HIPAA), redundancy needs...', required: false },
    ],
  },
  tour: {
    title: 'Schedule a Tour',
    icon: Calendar,
    fields: [
      { name: 'company', label: 'Company Name', type: 'text', required: true },
      { name: 'name', label: 'Your Name', type: 'text', required: true },
      { name: 'email', label: 'Work Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: false },
      { name: 'date', label: 'Preferred Date', type: 'date', required: true },
      { name: 'time', label: 'Preferred Time', type: 'select', options: ['Morning (9-12)', 'Afternoon (12-5)', 'Flexible'], required: true },
      { name: 'attendees', label: 'Number of Attendees', type: 'number', required: false },
      { name: 'notes', label: 'Areas of Interest', type: 'textarea', placeholder: 'Cooling systems, security infrastructure, network facilities, specific halls...', required: false },
    ],
  },
  contact: {
    title: 'Contact Operator',
    icon: MessageSquare,
    fields: [
      { name: 'company', label: 'Company Name', type: 'text', required: true },
      { name: 'name', label: 'Your Name', type: 'text', required: true },
      { name: 'email', label: 'Work Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: false },
      { name: 'subject', label: 'Subject', type: 'select', options: ['General Inquiry', 'Pricing Information', 'Partnership Opportunity', 'Technical Questions', 'Compliance & Certifications', 'Other'], required: true },
      { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your needs...', required: true },
    ],
  },
};

export default function ContactModal({ type, facility, onClose }) {
  const config = FORM_TYPES[type];
  const Icon = config.icon;
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
          <div className="modal-success">
            <CheckCircle size={48} />
            <h2>Request Submitted</h2>
            <p>
              Your {config.title.toLowerCase()} request for <strong>{facility?.operator} — {facility?.code}</strong> has been received.
              A representative will contact you within 1-2 business days.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: 16 }}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>

        <div className="modal-header">
          <div className="modal-icon-wrap"><Icon size={20} /></div>
          <div>
            <h2 className="modal-title">{config.title}</h2>
            {facility && (
              <p className="modal-subtitle">
                {facility.operator} &mdash; {facility.code} &bull; {facility.city}, {facility.state}
              </p>
            )}
          </div>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {config.fields.map(field => (
            <div key={field.name} className="modal-field">
              <label className="modal-label">
                {field.label}
                {field.required && <span className="modal-required">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  className="modal-input modal-textarea"
                  placeholder={field.placeholder || ''}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  className="modal-input"
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                >
                  <option value="">Select...</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="modal-input"
                  type={field.type}
                  placeholder={field.placeholder || ''}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Icon size={16} /> Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
