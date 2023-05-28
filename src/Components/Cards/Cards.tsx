import PostCard, { CardSize } from "./PostCard";
import styles from "./Cards.module.scss";

const posts = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
    size: CardSize.Large,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
    size: CardSize.Medium,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1564053051381-5cb91813736b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1210&q=80",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
    size: CardSize.Small,
  },
];

const Cards: React.FC = () => {
  return (
    <div className={styles.cards}>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Cards;
