'use client';

import { useState } from 'react';
import PyodideRunner from './PyodideRunner';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  explanation?: string;
}

export default function CodeBlock({ code, language, title, explanation }: CodeBlockProps) {
  const { isLoading, loadingMessage, error: pyodideError, runCode } = PyodideRunner();
  const [output, setOutput] = useState<string>('');
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    if (language !== 'python') {
      setExecutionError('Only Python code can be executed in browser');
      return;
    }

    setIsRunning(true);
    setExecutionError(null);
    setOutput('');

    try {
      const result = await runCode(code);
      if (result.error) {
        setExecutionError(result.error);
      } else {
        setOutput(result.output);
      }
    } catch (err) {
      setExecutionError(err instanceof Error ? err.message : 'Execution failed');
    }

    setIsRunning(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {title && <span className="text-sm text-gray-300 font-medium">{title}</span>}
          <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-400">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          {language === 'python' && (
            <button
              onClick={handleRun}
              disabled={isLoading || isRunning}
              className="text-xs px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Run
                </>
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {isLoading && language === 'python' && (
        <div className="px-4 py-2 bg-yellow-900/30 border-b border-yellow-700/50">
          <span className="text-yellow-400 text-xs">{loadingMessage}</span>
        </div>
      )}

      {pyodideError && language === 'python' && (
        <div className="px-4 py-2 bg-red-900/30 border-b border-red-700/50">
          <span className="text-red-400 text-xs">{pyodideError}</span>
        </div>
      )}

      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-100 font-mono">{code}</code>
      </pre>

      {output && (
        <div className="border-t border-gray-700">
          <div className="px-4 py-2 bg-gray-800/50">
            <span className="text-xs text-gray-400 font-medium">Output:</span>
          </div>
          <pre className="px-4 py-3 text-sm text-green-400 font-mono overflow-x-auto bg-gray-800">
            {output}
          </pre>
        </div>
      )}

      {executionError && (
        <div className="border-t border-gray-700">
          <div className="px-4 py-2 bg-red-900/20">
            <span className="text-xs text-red-400 font-medium">Error:</span>
          </div>
          <pre className="px-4 py-3 text-sm text-red-400 font-mono overflow-x-auto bg-gray-800">
            {executionError}
          </pre>
        </div>
      )}

      {explanation && (
        <div className="px-4 py-3 text-sm text-gray-300 bg-gray-800/50 border-t border-gray-700">
          <span className="text-gray-400 font-medium">Explanation: </span>
          {explanation}
        </div>
      )}
    </div>
  );
}