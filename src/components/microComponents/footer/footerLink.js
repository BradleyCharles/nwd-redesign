import { Link, useLocation } from "react-router-dom";

export function FooterLink(props) {
  const location = useLocation();

  const linkPath = props.to || "/" + props.name.toLowerCase();

  const currentPath = location.pathname.toLowerCase();
  const currentHash = location.hash.replace("#", "").toLowerCase();

  const isActive = currentPath === linkPath || currentHash === linkPath;

  return (
    <Link
      style={{
        color: isActive ? "var(--nwd-teal)" : "#4a5568",
        textDecoration: isActive ? "underline" : "none",
        fontWeight: isActive ? "600" : "400",
      }}
      to={linkPath}
      aria-current={isActive ? "page" : undefined}
    >
      {props.name}
    </Link>
  );
}