import openai from "openai";

export async function get({ params, request }: { request: Request }) {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);

  const topic = searchParams.get("topic");

  console.log("topic generate", topic);

  if (!topic) {
    return new Response(null, {
      status: 404,
      statusText: "Topic not found",
    });
  }

  // console.log(new URLSearchParams(request.url.split("?")[1]));

  const configuration = new openai.Configuration({
    apiKey: import.meta.env.OPEN_AI_KEY,
  });

  const client = new openai.OpenAIApi(configuration);

  // const resText = await client.createCompletion({
  //   // prompt: "Write a blog post about taking care of a corgi.",
  //   prompt: `Write a blog post about ${topic}.`,
  //   temperature: 0.7,
  //   max_tokens: 2048,
  //   model: "text-davinci-003",
  // });

  // console.log(resText.data.choices);
  // const blogText = resText.data.choices[0].text;

  // const resImage = await client.createImage({
  //   prompt: topic,
  //   n: 1,
  //   response_format: "url",
  //   size: "512x512",
  // });

  // const imagejson = resImage.data.data[0].url;

  // console.log(resImage.data.data[0].url);

  const blogText =
    "\n" +
    "\n" +
    "Yoga is an ancient practice that has been around for thousands of years. It is a spiritual and physical practice that helps to promote physical, mental, and emotional wellbeing. In modern times, yoga has become popular as a way to stay physically fit and healthy. It is also used as a form of relaxation and stress relief.\n" +
    "\n" +
    "Yoga is a form of exercise that is low impact and gentle on the body. It can be done at any age and can be modified for any level of fitness. There are many different types of yoga, from hatha yoga, which is a slower and more gentle form of yoga, to more vigorous forms such as power yoga and vinyasa yoga.\n" +
    "\n" +
    "The physical benefits of yoga are numerous. It increases flexibility, strength, and balance, as well as improving overall posture. It can also help to reduce stress, improve focus and concentration, and help to regulate breathing.\n" +
    "\n" +
    "Yoga also has many mental and emotional benefits. It can help to reduce anxiety, depression, and stress. It can also help to increase body awareness and self-acceptance. It can also help to reduce insomnia and improve overall mood.\n" +
    "\n" +
    "Yoga is an excellent form of exercise and relaxation. It can help to promote physical, mental, and emotional wellbeing. If you are looking for a way to improve your physical and mental health, then yoga is definitely worth looking into.";

  const imagejson =
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-3pElLsPxJxSTs7sMwAcUvrFV/user-p4TIPqgRmABsbZNlQ6a17KEH/img-h4bQX6QgJPnGzA0xk9VuuS3V.png?st=2022-12-28T03%3A45%3A50Z&se=2022-12-28T05%3A45%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-27T19%3A23%3A40Z&ske=2022-12-28T19%3A23%3A40Z&sks=b&skv=2021-08-06&sig=AjhqqAvTAjpDI4X8yor/SQ49TyYs2FzIy%2BgieLVsRz4%3D";

  console.log("this is on the server");

  return new Response(JSON.stringify({ imagejson, blogText }), {
    status: 200,
    headers: {
      "Content-Type": "application/jsonz",
    },
  });
}
