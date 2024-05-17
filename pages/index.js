// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to TupacKalkyl</h1>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Go to Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
