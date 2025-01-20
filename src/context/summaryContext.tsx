import { Summary } from '@/types/types'
import { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react'

type SummaryAction =
  | { type: 'SET_SUMMARY'; payload: Summary };

const summaryReducer = (state:Summary, action: SummaryAction) => {
    switch (action.type) {
        case 'SET_SUMMARY':
          return {
            cartValue: action.payload.cartValue,
            smallOrderSurcharge: action.payload.smallOrderSurcharge,
            deliveryFee: action.payload.deliveryFee,
            deliveryDistance: action.payload.deliveryDistance,
            totalPrice: action.payload.totalPrice
          }
        default:
          return state
      }
}

const SummaryContext = createContext<
[Summary, Dispatch<SummaryAction>] | undefined
>(undefined);

export const SummaryContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [summary, summaryDispatch] = useReducer(summaryReducer, { 
    cartValue:0,
    smallOrderSurcharge:0,
    deliveryFee:0,
    deliveryDistance:0,
    totalPrice:0
});

  return (
    <SummaryContext.Provider value={[summary, summaryDispatch]}>
      {children}
    </SummaryContext.Provider>
  )
}

export const useSummaryValue = (): Summary => {
    const context = useContext(SummaryContext);
    if (!context) {
      throw new Error('useSummaryValue must be used within a SummaryContextProvider');
    }
    return context[0];
  };
  
  export const useSummaryDispatch = (): Dispatch<SummaryAction> => {
    const context = useContext(SummaryContext);
    if (!context) {
      throw new Error('useSummaryDispatch must be used within a SummaryContextProvider');
    }
    return context[1];
  };

export default SummaryContext