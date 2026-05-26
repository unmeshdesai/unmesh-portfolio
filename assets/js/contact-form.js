document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector('.contact-form-status');
  const defaultBtnText = submitBtn.dataset.defaultText || submitBtn.textContent;

  function setStatus(message, tone) {
    statusEl.textContent = message;
    statusEl.dataset.tone = tone || '';
  }

  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitBtn.textContent = busy ? 'Sending…' : defaultBtnText;
    form.dataset.busy = busy ? 'true' : 'false';
  }

  function clientValidate(payload) {
    if (!payload.name) return 'Please enter your name.';
    if (!payload.email) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return 'Please enter a valid email address.';
    }
    if (!payload.subject) return 'Please enter a subject.';
    if (!payload.message || payload.message.length < 10) {
      return 'Message should be at least 10 characters.';
    }
    return null;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (form.dataset.busy === 'true') return;

    const data = new FormData(form);
    const payload = {
      name: (data.get('name') || '').trim(),
      email: (data.get('email') || '').trim(),
      phone: (data.get('phone') || '').trim(),
      subject: (data.get('subject') || '').trim(),
      message: (data.get('message') || '').trim(),
    };

    const validationError = clientValidate(payload);
    if (validationError) {
      setStatus(validationError, 'error');
      return;
    }

    setBusy(true);
    setStatus('', '');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let body = {};
      try { body = await response.json(); } catch (_) { /* non-JSON response */ }

      if (response.ok) {
        setStatus(body.message || 'Thanks! Your message has been sent.', 'success');
        form.reset();
      } else {
        setStatus(body.error || 'Something went wrong. Please try again.', 'error');
      }
    } catch (_) {
      setStatus('Network error. Please check your connection and try again.', 'error');
    } finally {
      setBusy(false);
    }
  });

});
