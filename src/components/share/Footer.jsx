import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer>
      <p>&copy; 2025 PocketFolio Footer</p>
    </footer>
  );
}