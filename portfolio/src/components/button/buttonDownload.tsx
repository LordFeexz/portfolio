import { type MouseEvent } from "react";

export default function ButtonDownload() {
  const download = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/assets/Ananda-Fiqri-Resume.pdf";
    link.download = "Ananda-Fiqri-Resume";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <button
      onClick={download}
      className="bg-transparent flex items-center space-x-3">
      <div className="h-4 w-4">
        <svg
          className="fill-current"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#000000">
          <polygon points="54 48 10 48 8 22 56 22 54 48" />
          <polyline points="12 22 12 12 22 12 26 16 52 16 52 22" />
        </svg>
      </div>
      <span>Click to download my Resume</span>
    </button>
  );
}
