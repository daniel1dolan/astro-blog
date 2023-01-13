/** @jsxImportSource solid-js */

interface PostDisplayProps {
  imageSrc: string;
  title: string;
  author: string;
  body: string;
}

export function PostDisplay(props: PostDisplayProps) {
  // const { author, body, imageSrc, title } = props;
  return (
    <main class="container mx-auto py-8 px-6">
      <div class="mb-8 flex justify-between items-center">
        <a
          class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
          href="/"
        >
          Back to Blog List
        </a>
      </div>
      <img
        class="w-1/2 rounded-lg shadow-md"
        // src={`/images/${slug}.jpeg`}
        src={props.imageSrc}
        alt="Article image"
        width="700"
        height="400"
        // aspectRatio="16:9"
      />
      <div class="mt-8">
        <h1 class="text-4xl font-bold text-gray-800">{props.title}</h1>
        <p class="text-gray-600 text-sm mt-2">Written by {props.author}</p>
        <p class="text-gray-700 mt-4 whitespace-pre-wrap">{props.body}</p>
      </div>
    </main>
  );
}
