import { useCallback, useState } from 'react';

function useInput({ type }) {
  const [value, setValue] = useState("");

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  },[])

  const input = <input value={value} onChange={handleChange} type={type} />
  
  return [value, input];
}

export default useInput;