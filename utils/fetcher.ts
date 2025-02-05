import { dotenvVar } from "./env";

type fetchDataProps = {
  endpoint: string
}
const fetchData = async ({ endpoint }: fetchDataProps) => {
  const res = await fetch(`${dotenvVar.API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!res.ok) {
    throw new Error("Response is not ok")
  };
  const data = await res.json();
  return data
}

export default fetchData