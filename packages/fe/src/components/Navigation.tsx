import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
        <li>
          <Link to="/max-age">Max Age Cache</Link>
        </li>
        <li>
          <Link to="/no-cache">No Cache</Link>
        </li>
        <li>
          <Link to="/no-store">No Store</Link>
        </li>
        <li>
          <Link to="/stale-while-revalidate">Stale While Revalidate</Link>
        </li>
        <li>
          <Link to="/etag">ETag</Link>
        </li>
        <li>
          <Link to="/abort-controller-manual">Abort Controller Manual</Link>
        </li>
        <li>
          <Link to="/abort-controller-tanstack">Abort Controller Tanstack</Link>
        </li>
      </ul>
    </nav>
  );
};

export { Navigation };
