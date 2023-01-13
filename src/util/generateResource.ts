export const generateResource = async (
  topic: string,
  requestedResource: "blog" | "image"
) => {
  console.log(import.meta.env.PUBLIC_API_URL);
  console.log(topic);
  const res = await fetch(
    `${
      import.meta.env.PUBLIC_API_URL
    }/generatePost?topic=${topic}&requestedResource=${requestedResource}`
  );
  return res.json();
};
