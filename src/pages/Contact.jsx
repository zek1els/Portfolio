import { useState } from 'react';

const initialForm = { name: '', email: '', subject: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Le nom est requis.';
  if (!form.email.trim()) {
    errors.email = "L'email est requis.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "L'email n'est pas valide.";
  }
  if (!form.subject.trim()) errors.subject = 'Le sujet est requis.';
  if (!form.message.trim()) {
    errors.message = 'Le message est requis.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères.';
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setSuccess(false);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi du message");
      setSuccess(true);
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page contact-page">
      <section className="page-header">
        <h1>Contact</h1>
        <p>
          Une question ou une proposition de projet ? N'hésitez pas à me
          contacter.
        </p>
      </section>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {success && (
          <div className="success-message">
            Message envoyé avec succès ! Je vous répondrai bientôt.
          </div>
        )}
        {serverError && <div className="error-message">{serverError}</div>}

        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Sujet</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Sujet du message"
            className={errors.subject ? 'input-error' : ''}
          />
          {errors.subject && (
            <span className="field-error">{errors.subject}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Votre message..."
            rows="6"
            className={errors.message ? 'input-error' : ''}
          />
          {errors.message && (
            <span className="field-error">{errors.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </main>
  );
}
