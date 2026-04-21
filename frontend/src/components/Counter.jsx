import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicked ${count} times`; // side effect
  }, [count]); // dependency array

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>Your Count {count}</p>
      <button onClick={() => setCount(count + 1)}>Increament</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;
