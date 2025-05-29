import Link from 'next/link';
import { ArrowRight, Brain, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              The Decentralized Platform for
              <span className="text-indigo-600 dark:text-indigo-400 block mt-2">AI Model Collaboration</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Upload, discover, and collaborate on AI models in a decentralized environment. 
              Powered by blockchain technology for transparency and trust.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg">
                <Link href="/dashboard">
                  Explore Models
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950 text-lg">
                <Link href="/upload">
                  Contribute Model
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative shape */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Why Choose AGIforge?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform offers unique advantages for AI researchers and enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                AI Model Discovery
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Explore and discover a vast collection of AI models uploaded by the community.
                Find the perfect model for your research or application.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Decentralized Trust
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                With blockchain technology, establish trust and verifiability for
                model authorship, versioning, and usage rights in a decentralized way.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Community Collaboration
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Join a vibrant community of AI researchers and enthusiasts to collaborate,
                provide feedback, and improve models collectively.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Join the AGIforge Community?
            </h2>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-8">
              Connect your wallet and start contributing to the decentralized AI ecosystem today.
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">
              <Link href="/upload" className="inline-flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}