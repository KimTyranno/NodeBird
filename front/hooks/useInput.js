import { useState, useCallback } from "react";

// useState를 반복해서 쓸 필요없이 만들어둔 커스텀hook
export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
