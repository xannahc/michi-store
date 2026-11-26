import { useEffect, useState } from "react";

export const useAsync = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoader(true);
    setError(null);

    asyncFunction()
      .then((result) => {
        if (!ignore) {
          setData(result);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoader(false);
        }
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, error, loader };
};
