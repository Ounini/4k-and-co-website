import ThemeButton from "./context/ThemeButton";
import useFetch from "./hooks/useFetch";
import { BounceLoader } from "react-spinners";

function Home() {
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );
  console.log(data);

  if (loading) return <BounceLoader color="blue" />;

  return (
    <div>
      <h1>This is a Landing page</h1>
      <ThemeButton />

      <ul>
        {data.slice(0, 6).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
