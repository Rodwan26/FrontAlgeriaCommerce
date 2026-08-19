export default function Hero() {
  return (
    <section
      style={{
        minHeight: "700px",
        background: "yellow",
        padding: "50px",
      }}
    >
      <h1
        style={{
          color: "black",
          fontSize: "50px",
          fontWeight: "bold",
        }}
      >
        HERO TEST
      </h1>

      <img
        src="/products/hero.jpg"
        alt="test"
        style={{
          display: "block",
          width: "500px",
          height: "400px",
          objectFit: "contain",
          background: "black",
        }}
      />
    </section>
  );
}