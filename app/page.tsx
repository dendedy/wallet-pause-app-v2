'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qzjajebjsjtmjdldmkwf.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_1895C5FKheAOjhZzsy3PHA_aq1NgbRn'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Отправка...');

    try {
      const { error } = await supabase
        .from('requests')
        .insert([{ name, email, message, created_at: new Date() }]);

      if (error) throw error;

      setStatus('Заявка успешно отправлена!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('Ошибка при отправке. Проверьте консоль.');
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: '4rem auto', padding: '1rem', fontFamily: 'Arial' }}>
      <h1>Оставить заявку</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Сообщение</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#3ec1d5', color: 'white', border: 'none', cursor: 'pointer' }}>
          Отправить
        </button>
      </form>
      {status && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>}
    </main>
  );
}
