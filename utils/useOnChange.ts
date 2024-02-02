import { useState } from "react";

const useOnChange = ({ delay }: { delay?: number }) => {
  const [timeout, setTimeOutValue] = useState<NodeJS.Timeout>();

  const onChange = (callback: () => void) => {
    if (timeout) clearTimeout(timeout);
    setTimeOutValue(
      setTimeout(function () {
        callback();
      }, delay || 1000)
    );
  };
  return { onChange };
};

export default useOnChange;
