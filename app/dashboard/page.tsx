'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModelCard from '@/components/models/ModelCard';
import EmptyState from '@/components/EmptyState';

// Simulated model data
const MOCK_MODELS = [
  {
    id: '1',
    name: 'NLP Transformer Model',
    type: 'NLP',
    description: 'A state-of-the-art natural language processing model based on the transformer architecture. This model achieves SOTA results on multiple benchmarks including GLUE, SuperGLUE, and SQuAD.',
    contributorAddress: '0x1a2b3c4d5e6f7g8h9i0j',
    score: 92,
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    uploadDate: '2025-02-15T12:00:00Z'
  },
  {
    id: '2',
    name: 'Computer Vision Detector',
    type: 'Vision',
    description: 'Object detection model capable of identifying and localizing multiple objects in images with high accuracy. Trained on a diverse dataset of real-world images.',
    contributorAddress: '0x2b3c4d5e6f7g8h9i0j1k',
    score: 88,
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdH',
    uploadDate: '2025-03-01T12:00:00Z'
  },
  {
    id: '3',
    name: 'Generative Audio Model',
    type: 'Other',
    description: 'A model for generating realistic audio samples from text descriptions. Can create music, sound effects, and voice clips with minimal artifacts.',
    contributorAddress: '0x3c4d5e6f7g8h9i0j1k2l',
    score: 75,
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdI',
    uploadDate: '2025-04-10T12:00:00Z'
  },
  {
    id: '4',
    name: 'Sentiment Analysis NLP',
    type: 'NLP',
    description: 'Specialized model for sentiment analysis in financial texts. Optimized for analyzing earnings reports, financial news, and market sentiment.',
    contributorAddress: '0x4d5e6f7g8h9i0j1k2l3m',
    score: 81,
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdJ',
    uploadDate: '2025-05-05T12:00:00Z'
  },
  {
    id: '5',
    name: 'Medical Image Segmentation',
    type: 'Vision',
    description: 'Advanced segmentation model for medical imaging. Capable of accurately identifying and outlining anatomical structures and abnormalities in MRI and CT scans.',
    contributorAddress: '0x5e6f7g8h9i0j1k2l3m4n',
    score: 95,
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdK',
    uploadDate: '2025-05-22T12:00:00Z'
  }
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [models, setModels] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sortOption, setSortOption] = useState('newest');
  
  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setModels(MOCK_MODELS);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredAndSortedModels = models
    .filter(model => {
      const matchesSearch = 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'All' || model.type === typeFilter;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        case 'highest':
          return b.score - a.score;
        case 'lowest':
          return a.score - b.score;
        default:
          return 0;
      }
    });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Community Contributions
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Discover and explore AI models contributed by the AGIverse community
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg border border-slate-200 dark:border-slate-700 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-40">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="NLP">NLP</SelectItem>
                  <SelectItem value="Vision">Vision</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-40">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Advanced Filter</span>
            </Button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading models...</p>
        </div>
      ) : filteredAndSortedModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedModels.map((model) => (
            <ModelCard key={model.id} {...model} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No models found"
          description={
            searchTerm || typeFilter !== 'All'
              ? "Try adjusting your search or filter criteria."
              : "It looks like there are no models in the AGIverse yet. Be the first to contribute!"
          }
          actionLabel="Upload a Model"
          actionHref="/upload"
        />
      )}
    </div>
  );
}