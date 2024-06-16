// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// type customUrlProp = {
//   url: string
// }

// export function CustomUrl({url}: customUrlProp) {
//   return (
//     <div className="flex w-full max-w-sm items-center space-x-2">
//       <Input type="email" placeholder={url} />
//       <Button type="button" onClick={}>Copy</Button>
//     </div>
//   )
// }

import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface CopyUrlComponentProps {
  url: string;
}

const CopyUrlComponent: React.FC<CopyUrlComponentProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div>
      <Card className="flex items-center space-x-2 p-4">
      <span className="text-gray-800 dark:text-white break-all ">{url}</span>
      <Button className="" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </Button>
    </Card>
    </div>
  );
};

export default CopyUrlComponent;
