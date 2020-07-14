import Link from "next/link";
import React, { useEffect } from "react";

export function NoMatch() {
  // const pathname = useParams()["*"];
  const message = "";
  useEffect(() => {
    document.title = "Page Not Found";
  });
  return (
    <div>
      <h3>Page Not Found</h3>
      <p>
        {message ? message : `Sorry, no document for ${location.pathname}.`}
      </p>
      <p>
        <Link href="/">Go back to the home page</Link>
      </p>
    </div>
  );
}
