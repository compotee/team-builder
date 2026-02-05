import React, { createContext, useContext, useState } from 'react';

interface DistributionContextType {
  selectedDistributionId: number | null;
  setSelectedDistributionId: (id: number | null) => void;
}

const DistributionContext = createContext<DistributionContextType | undefined>(undefined);

export const DistributionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDistributionId, setSelectedDistributionId] = useState<number | null>(null);

  return (
    <DistributionContext.Provider value={{ selectedDistributionId, setSelectedDistributionId }}>
      {children}
    </DistributionContext.Provider>
  );
};

// Хук для использования контекста
// eslint-disable-next-line react-refresh/only-export-components
export const useDistribution = () => {
  const context = useContext(DistributionContext);
  if (context === undefined) {
    throw new Error('useDistribution must be used within a DistributionProvider');
  }
  return context;
};