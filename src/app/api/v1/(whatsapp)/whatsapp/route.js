import { NextResponse } from 'next/server';
import messagebird from 'messagebird';

const messageBirdClient = messagebird(process.env.MESSAGEBIRD_ACCESS_KEY);

export async function POST(req) {
  try {
    const { to, message } = await req.json();

    const params = {
      to: to,
      from: '+916230097248',  
      type: 'text',
      content: {
        text: message
      }
    };

    return new Promise((resolve, reject) => {
      messageBirdClient.conversations.send(params, (err, response) => {
        if (err) {
          console.error('Error sending WhatsApp message:', err);
          resolve(
            NextResponse.json({ success: false, error: err.message }, { status: 500 })
          );
        } else {
          console.log('Message sent:', response);
          resolve(
            NextResponse.json({ success: true, response }, { status: 200 })
          );
        }
      });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

 
