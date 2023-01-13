/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";
import { generateResource } from "../util/generateResource";
import { PostDisplay } from "./PostDisplay";

export function CreatePost() {
  const [topic, setTopic] = createSignal("");

  const [currentResources, setCurrentResource] = createSignal({
    image: "",
    text: "",
  });

  const onGetBlogText = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(topic());
    const res = await generateResource(topic(), "blog");
    console.log(res);
    if (res.blogText) {
      setCurrentResource((prev) => ({
        ...prev,
        text: res.blogText,
      }));
    }
  };

  const onGetImage = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(topic());
    const res = await generateResource(topic(), "image");
    console.log(res);
    if (res.imagejson) {
      setCurrentResource((prev) => ({
        ...prev,
        image: res.imagejson,
      }));
    }
  };

  return (
    <div>
      <div class="container mx-auto py-8">
        <div class="flex justify-center items-center space-x-2">
          <label>
            New Topic:
            <input
              name="Topic"
              type="text"
              onChange={(e) => setTopic(e.currentTarget.value)}
              class="p-2 m-2"
              value={topic()}
            />
          </label>
          <div class="flex space-x-2">
            <form onSubmit={onGetBlogText}>
              <button class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600">
                Get Blog Text
              </button>
            </form>
            <form onSubmit={onGetImage}>
              <button class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600">
                Get Image
              </button>
            </form>
          </div>
        </div>
      </div>
      {currentResources().text && currentResources().image ? (
        <PostDisplay
          author="Draft Post - You"
          body={currentResources().text}
          imageSrc={currentResources().image}
          title={topic()}
        />
      ) : (
        <p class="text-center">
          Post preview will display here once text and image are loaded.
        </p>
      )}
    </div>
  );
}
