'use client';

import { useWalletContext } from '@/context/WalletContext';
import ModelUploadForm from '@/components/models/ModelUploadForm';
import WalletConnect from '@/components/WalletConnect';

export default function UploadPage() {
  const { isConnected } = useWalletContext();
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Upload Model
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Share your AI model with the AGIverse community. All uploads are stored on IPFS and referenced on the blockchain.
        </p>
      </div>
      
      {!isConnected && (
        <div className="bg-indigo-50 dark:bg-indigo-950/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-indigo-600 dark:text-indigo-400 mb-4">
            Please connect your wallet to upload a model. This is required to verify your identity and ownership of the model.
          </p>
          <WalletConnect />
        </div>
      )}
      
      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6">
          <ModelUploadForm />
        </div>
      </div>
      
      <div className="mt-10 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
          Upload Guidelines
        </h3>
        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-start">
            <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
            <span>Ensure you have the rights to upload and share the model</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
            <span>Maximum file size is 100MB. For larger models, please contact us</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
            <span>Include detailed descriptions to help others understand your model</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
            <span>Be responsive to comments and questions from the community</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
            <span>Consider providing usage examples or documentation for your model</span>
          </li>
        </ul>
      </div>
    </div>
  );
}