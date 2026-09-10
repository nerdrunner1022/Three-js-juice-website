import { useState, useEffect } from 'react';

class ToastManager {
  listeners = new Set();

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event) {
    this.listeners.forEach((listener) => listener(event));
  }

  custom(renderFn, options = {}) {
    const id = Math.random().toString(36).substring(2, 9);
    this.notify({ id, renderFn, options, visible: true });
    return id;
  }

  dismiss(id) {
    this.notify({ id, dismiss: true });
  }
}

export const toast = new ToastManager();

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    return toast.subscribe((event) => {
      if (event.dismiss) {
        setToasts((prev) => prev.map((t) => (t.id === event.id ? { ...t, visible: false } : t)));
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== event.id));
        }, 400);
      } else {
        setToasts((prev) => [...prev, event]);
        if (event.options?.duration !== Infinity) {
          const duration = event.options?.duration || 3500;
          setTimeout(() => {
            toast.dismiss(event.id);
          }, duration);
        }
      }
    });
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: 'auto' }}>
          {t.renderFn(t)}
        </div>
      ))}
    </div>
  );
}
