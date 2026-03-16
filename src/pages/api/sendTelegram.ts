import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  try {
    const { name, phone } = await request.json();

    const BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing env vars' }), {
        status: 500,
      });
    }

    const message = `📞 Нова заявка з сайту\n\n👤 Ім'я: ${name.trim()}\n📱 Телефон: ${phone.trim()}`;

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    const data = await res.json();

    if (!data.ok) throw new Error(JSON.stringify(data));

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    let message = 'Unknown error';
    if (err instanceof Error) message = err.message;
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500 });
  }
};
