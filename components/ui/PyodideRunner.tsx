'use client';

import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<string>;
  globals: {
    get: (name: string) => unknown;
  };
  loadPackage: (packages: string | string[]) => Promise<void>;
}

export default function PyodideRunner() {
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading Python runtime...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPyodideInstance = async () => {
      try {
        setLoadingMessage('Downloading Python runtime...');
        
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.onload = async () => {
            setLoadingMessage('Initializing Python environment...');
            const pyodideInstance = await window.loadPyodide!({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
            });
            
            setLoadingMessage('Loading data science packages...');
            await pyodideInstance.loadPackage(['numpy', 'pandas', 'matplotlib']);
            
            setPyodide(pyodideInstance);
            setIsLoading(false);
          };
          script.onerror = () => {
            setError('Failed to load Python runtime');
            setIsLoading(false);
          };
          document.head.appendChild(script);
        } else {
          const pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
          });
          await pyodideInstance.loadPackage(['numpy', 'pandas', 'matplotlib']);
          setPyodide(pyodideInstance);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Python');
        setIsLoading(false);
      }
    };

    loadPyodideInstance();
  }, []);

  const runCode = useCallback(async (code: string): Promise<{ output: string; error: string | null }> => {
    if (!pyodide) {
      return { output: '', error: 'Python runtime not loaded' };
    }

    try {
      const result = await pyodide.runPythonAsync(code);
      return { output: result || 'No output', error: null };
    } catch (err) {
      return { 
        output: '', 
        error: err instanceof Error ? err.message : 'Execution error' 
      };
    }
  }, [pyodide]);

  return {
    pyodide,
    isLoading,
    loadingMessage,
    error,
    runCode,
  };
}