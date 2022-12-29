import React from "react";

export interface Props {
  title: string;
  author: string;
  body: string;
  href: string;
  src: string;
}

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget lacus eu
      tellus consequat viverra. Nulla facilisi. Fusce consectetur elit id urna
      accumsan, in laoreet velit vehicula.`;

const NewCard = (props: Props) => {
  const { href, title, author, body = lorem, src } = props;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        className="w-full rounded-lg shadow-md"
        src={src}
        alt="Article image"
      />
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">Written by {author}</p>
        <p className="text-gray-700 mt-4">{body}</p>
      </div>
      <div className="mt-4">
        <a
          className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
          href={href}
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewCard;
