import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectForm.css';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  business: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
  budget: z.string().optional(),
});

const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'Website', label: 'Website' },
  { value: 'Website Redesign', label: 'Website Redesign' },
  { value: 'Branding', label: 'Branding' },
  { value: 'Website + Branding', label: 'Website + Branding' },
  { value: 'Other', label: 'Other' },
];

const budgetOptions = [
  { value: '', label: 'Select budget (optional)' },
  { value: '₹25K–₹50K', label: '₹25K – ₹50K' },
  { value: '₹50K–₹1L', label: '₹50K – ₹1L' },
  { value: '₹1L+', label: '₹1L+' },
];

export default function ProjectForm() {
  const [formState, setFormState] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      business: '',
      email: '',
      service: '',
      message: '',
      budget: '',
    },
  });

  const onSubmit = async (data) => {
    if (formState === 'loading') return; // Prevent duplicate submission

    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'cfdf601d-c131-474f-a65f-4060cb2ee5b3',
          subject: `New Project Enquiry — ${data.name}${data.business ? ` (${data.business})` : ''}`,
          from_name: 'Rensor',
          name: data.name,
          email: data.email,
          business: data.business || '—',
          service: data.service,
          budget: data.budget || '—',
          message: data.message || '—',
        }),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.message || 'Something went wrong');
      }

      setFormState('success');
      reset();
    } catch (error) {
      setFormState('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again or email us directly.');
    }
  };

  if (formState === 'success') {
    return (
      <motion.div
        className="form-success"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="form-success__heading text-h1">PROJECT RECEIVED.</h2>
        <p className="form-success__text text-body-lg">
          Thanks for reaching out. We'll review your project and get back to you soon.
        </p>
        <Link to="/" className="btn btn-primary" id="form-back-btn">
          BACK TO RENSOR <span className="arrow">↗</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <form
      className="project-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      id="project-form"
    >
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="form-name" className="form-label">Name *</label>
          <input
            id="form-name"
            type="text"
            placeholder="Your name"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            {...register('name')}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="form-business" className="form-label">Business / Brand</label>
          <input
            id="form-business"
            type="text"
            placeholder="Your business or brand"
            className="form-input"
            {...register('business')}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="form-email" className="form-label">Email *</label>
        <input
          id="form-email"
          type="email"
          placeholder="you@company.com"
          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
          {...register('email')}
        />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="form-service" className="form-label">What do you need? *</label>
          <select
            id="form-service"
            className={`form-select ${errors.service ? 'form-input--error' : ''}`}
            {...register('service')}
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && <span className="form-error">{errors.service.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="form-budget" className="form-label">Budget</label>
          <select
            id="form-budget"
            className="form-select"
            {...register('budget')}
          >
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="form-message" className="form-label">Tell us about your project</label>
        <textarea
          id="form-message"
          placeholder="Tell us a little about what you're looking to build..."
          className="form-textarea"
          rows={5}
          {...register('message')}
        ></textarea>
      </div>

      <AnimatePresence>
        {formState === 'error' && (
          <motion.div
            className="form-error-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        className="btn btn-primary form-submit"
        disabled={formState === 'loading'}
        id="form-submit-btn"
      >
        {formState === 'loading' ? (
          <>
            <span className="form-spinner" aria-hidden="true"></span>
            SENDING...
          </>
        ) : (
          <>SUBMIT PROJECT <span className="arrow">↗</span></>
        )}
      </button>
    </form>
  );
}
