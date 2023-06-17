import useSWR from "swr";

const fetcher = async function (url) {
  const req = await fetch(url);

  const res = await req.json();
  // console.log(res, "res");
  return res;
};

const useFetch = function (url) {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return { data, error, isLoading };
};

export default useFetch;
