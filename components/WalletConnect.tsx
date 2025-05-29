'use client';

import { Button } from '@/components/ui/button';
import { useWalletContext } from '@/context/WalletContext';

export default function WalletConnect() {
  const { isConnected, connectWallet, walletAddress, disconnectWallet } = useWalletContext();
  
  return (
    <div>
      {isConnected ? (
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
            <p className="text-sm text-slate-600 dark:text-slate-300 font-mono">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={disconnectWallet}
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
          >
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button 
          onClick={connectWallet}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}