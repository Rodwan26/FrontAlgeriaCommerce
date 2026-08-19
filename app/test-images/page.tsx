export default function TestImages() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080a0b",
        padding: "40px",
      }}
    >
      <h1 style={{ color: "white", marginBottom: "30px" }}>
        Image Test
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          maxWidth: "800px",
        }}
      >
        <img
          src="/products/hero.jpg"
          alt="Hero"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
            background: "#222",
          }}
        />

        <img
          src="/products/feature-1.webp"
          alt="Feature 1"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
            background: "#222",
          }}
        />

        <img
          src="/products/feature-2.webp"
          alt="Feature 2"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
            background: "#222",
          }}
        />
      </div>
    </main>
  );
}