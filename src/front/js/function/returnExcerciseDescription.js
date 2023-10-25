
export async function getStructuredMessage(exercise, numWords, keyWords) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: `Write a exercise description for a  ${exercise} that is around ${numWords || 100 } with this keywords ${keyWords}` }],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

