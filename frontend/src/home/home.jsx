import StartHome from "./start-home";
import BestSeller from "./best-seller";

function Home({ handleAdd, addWishlist, products }) {
  return (
    <>
      <StartHome />
      <BestSeller
        products={products}
        handleAdd={handleAdd}
        addWishlist={addWishlist}
      />
    </>
  );
}

export default Home;
