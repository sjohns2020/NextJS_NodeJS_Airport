'use client';
import { useRouter } from 'next/navigation';
import './backButton.css';

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="back-button">
      Go Back
    </button>
  );
};

export default BackButton;
