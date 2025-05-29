import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export default function EmptyState({ 
  title, 
  description,
  actionLabel,
  actionHref
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-indigo-100 dark:bg-indigo-950/50 rounded-full p-6 mb-6">
        <Compass className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
      </div>
      
      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mb-8">
        {description}
      </p>
      
      <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
        <Link href={actionHref}>
          {actionLabel}
        </Link>
      </Button>
    </div>
  );
}