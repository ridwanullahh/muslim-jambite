
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, Clock } from 'lucide-react';
import { Poll, PollOption } from '@/types/sdk';

interface PollCardProps {
  poll: Poll;
  onVote?: (optionId: string) => void;
  hasVoted?: boolean;
  userVote?: string;
}

export const PollCard = ({ poll, onVote, hasVoted = false, userVote }: PollCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(userVote || null);
  const [showResults, setShowResults] = useState(hasVoted);

  const handleVote = () => {
    if (selectedOption && onVote) {
      onVote(selectedOption);
      setShowResults(true);
    }
  };

  const isExpired = poll.expiresAt ? new Date(poll.expiresAt) < new Date() : false;
  const canVote = !hasVoted && !isExpired && selectedOption;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-left mb-2">{poll.question}</CardTitle>
            <CardDescription className="flex items-center space-x-4 text-left">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{poll.totalVotes} votes</span>
              </div>
              {poll.expiresAt && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className={isExpired ? 'text-red-500' : ''}>
                    {isExpired ? 'Expired' : 'Active'}
                  </span>
                </div>
              )}
            </CardDescription>
          </div>
          <BarChart3 className="w-6 h-6 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isUserVote = userVote === option.id;
            
            return (
              <div key={option.id} className="space-y-2">
                <button
                  onClick={() => !showResults && !isExpired && setSelectedOption(option.id)}
                  disabled={showResults || isExpired}
                  className={`w-full p-3 text-left rounded-lg border transition-colors ${
                    showResults
                      ? isUserVote
                        ? 'border-brand-primary bg-brand-primary/10'
                        : 'border-gray-200 dark:border-gray-700'
                      : isSelected
                        ? 'border-brand-primary bg-brand-primary/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary/50'
                  } ${showResults || isExpired ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isUserVote && showResults ? 'font-semibold' : ''}>
                      {option.text}
                      {isUserVote && showResults && ' (Your vote)'}
                    </span>
                    {showResults && (
                      <span className="text-sm font-medium">
                        {option.votes} ({option.percentage}%)
                      </span>
                    )}
                  </div>
                </button>
                
                {showResults && (
                  <Progress 
                    value={option.percentage} 
                    className="h-2"
                  />
                )}
              </div>
            );
          })}
        </div>

        {!showResults && !isExpired && (
          <Button 
            onClick={handleVote}
            disabled={!canVote}
            className="w-full mt-4"
          >
            Cast Vote
          </Button>
        )}

        {isExpired && !showResults && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This poll has expired
            </p>
          </div>
        )}

        {hasVoted && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-green-700 dark:text-green-300">
              Thank you for voting!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
