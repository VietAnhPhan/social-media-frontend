import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = title + " | Myinterests";
  }, [title]);
}

export default useTitle;
