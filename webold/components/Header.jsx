import Link from 'next/link';
import NavBar from './NavBar';

const linkStyle = {
  marginRight: 15,
};

const Header = () => {
  return (
    <div>
      <NavBar />
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

export default Header;
