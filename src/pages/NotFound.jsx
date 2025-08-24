import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return 
  <div>
  <h1>404 - Page Not Found</h1>;
  <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Back Home</Link>
          </div>
}