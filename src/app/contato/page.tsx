'use client';

import { useEffect } from 'react';
import { WHATSAPP_URL } from '../../constants/contact';

export default function Contato() {
  useEffect(() => {
    window.location.href = WHATSAPP_URL;
  }, []);

  return (
    <main style={{
      backgroundColor: '#f4f3e8',
      color: '#000000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'inherit'
    }}>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
        Iniciando conversa...
      </h1>
      <p style={{ fontSize: '1rem', color: '#555', margin: 0 }}>
        Você está sendo redirecionado para o WhatsApp da ARCH.9 (+55 47 99131-2378).
      </p>
      <a
        href={WHATSAPP_URL}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#000000',
          color: '#f4f3e8',
          padding: '14px 28px',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: '1rem',
          transition: 'transform 0.2s ease',
        }}
      >
        Abrir WhatsApp Agora →
      </a>
    </main>
  );
}
