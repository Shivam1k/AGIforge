'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ThumbsUp, ThumbsDown, Download } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type ModelType = 'NLP' | 'Vision' | 'Other';

interface ModelCardProps {
  id: string;
  name: string;
  type: ModelType;
  description: string;
  contributorAddress: string;
  score: number;
  ipfsHash: string;
  uploadDate: string;
}

export default function ModelCard({ 
  id,
  name, 
  type, 
  description, 
  contributorAddress, 
  score,
  ipfsHash,
  uploadDate
}: ModelCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const getBadgeColor = (type: ModelType) => {
    switch(type) {
      case 'NLP':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Vision':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Other':
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const formattedDate = new Date(uploadDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={cn("mb-2", getBadgeColor(type))}>
              {type}
            </Badge>
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
          </div>
          <div className={cn("text-2xl font-bold", getScoreColor(score))}>
            {score}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
          <div className="truncate">{contributorAddress.slice(0, 6)}...{contributorAddress.slice(-4)}</div>
          <div>{formattedDate}</div>
        </div>
        
        <p className={cn(
          "text-slate-600 dark:text-slate-300 text-sm transition-all duration-300",
          expanded ? "" : "line-clamp-2"
        )}>
          {description}
        </p>
        
        {description.length > 120 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm mt-1 font-medium"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
        
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Community Rating</span>
            <span>{score}/100</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between gap-2">
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="text-slate-600 dark:text-slate-400">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Upvote</span>
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-600 dark:text-slate-400">
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Downvote</span>
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline" className="text-xs">
            <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              <span className="sr-only sm:not-sr-only">IPFS</span>
            </a>
          </Button>
          <Button asChild size="sm" variant="default" className="text-xs bg-indigo-600 hover:bg-indigo-700">
            <a href={`https://ipfs.io/ipfs/${ipfsHash}?download=true`} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-1" />
              <span className="sr-only sm:not-sr-only">Download</span>
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}