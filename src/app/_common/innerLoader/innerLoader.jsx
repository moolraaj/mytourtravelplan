import { useState, useEffect } from 'react';
import styles from './style.css';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0); 

  useEffect(() => {
  
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;  
        }
        return prev + 1;  
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.progressText +" " + "loading_bar_handler"}>Please Wait Loading..... {progress} %</div>
    </div>
  );
};

export default LoadingBar;
