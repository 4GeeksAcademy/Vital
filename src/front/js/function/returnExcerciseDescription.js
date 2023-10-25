export const generateDescription = async ({ exercise, numWords, keyWords }) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHATGPT_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Write a exercise description for a  ${exercise} that is around ${
            numWords || 100
          } ${
            keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
          }. The exercise should be described in general terms`,
          max_tokens: 100,
          temperature: 0.5,
        }),
      }
    );
    const data = await response.json();

    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req, res) {
  const { exercise, numWords, keyWords } = req.body;

  const excerciseDescription = await generateDescription({
    exercise,
    numWords,
    keyWords,
  });

  res.status(200).json({
    excerciseDescription,
  });
}
