export default function SkeletonProduct() {
  return (
    <center
      style={{ width: 200, marginBottom: "5rem" }}
      className="skeleton-effect"
    >
      <div style={{ width: 200, height: 60 }}></div>
      <header style={{ width: 200, height: 10 }}></header>
      <div style={{ width: 200, height: 200 }} />
      <p style={{ width: 200, height: 25 }}></p>

      <div style={{ width: 175, height: 32 }}></div>
    </center>
  );
}
