import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
};

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
      <Link href="/posts">
        <a style={linkStyle}>Posts</a>
      </Link>
    </div>
  );
}
