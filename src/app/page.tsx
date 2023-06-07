import Cube from "@/components/cube";
import { fetchBlogPosts } from "@/contentful/posts";

export default async function Home() {
  const entries = await fetchBlogPosts({ preview: false });
  console.log(entries);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Cube
        size={200}
        color={"#0D8E77"}
        opacity={0.6}
        dragConstraints={{ left: 15, right: 15, top: 15, bottom: 15 }}
        dragElastic={0.5}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        dropShadow={true}
      ></Cube>
      {entries.map((item: any, index: any) => {
        return <p key={index}>{item.description}</p>;
      })}
    </main>
  );
}
