export async function getStructuredMessage(exercise, numWords, keyWords) {
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Write a description for a given exercise It should have numWords words and given base on this keywords`,
        },
        {
          role: "user",
          content: `exercise: ${exercise} numWords: ${numWords} keyWords: ${keyWords}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 30,
    }),
  }); 
  console.log(response)
  const data = await response.json();
  return data //.choices[0].message.content;
}

export async function getRoutines(bodypart, numExercises) {
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `list a routines just with the exersise name for a given bodypart and number of exercises`,
        },
        {
          role: "user",
          content: `numExercise: ${numExercises} bodypart: ${bodypart}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 40,
    }),
  }); 
  console.log(response)
  const data = await response.json();
  return data //.choices[0].message.content;
}
