import { FormInput } from '@/types/types'
import { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react'

type FormAction = {
  type: 'SET_FORM_INPUT';
  payload: Partial<FormInput>;
};

const formReducer = (state: FormInput, action: FormAction): FormInput => {
  switch (action.type) {
    case 'SET_FORM_INPUT':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const FormContext = createContext<
  [FormInput, Dispatch<FormAction>] | undefined
>(undefined);


export const FormContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [form, formDispatch] = useReducer(formReducer, {
    venueSlug: 'home-assignment-venue-helsinki',
    cartValue: 1000,
    userLatitude:  60.18395,
    userLongitude: 24.82786,
  });

  return (
    <FormContext.Provider value={[form, formDispatch]}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hooks for using the context
export const useFormValue = (): FormInput => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormValue must be used within a FormContextProvider');
  }
  return context[0];
};

export const useFormDispatch = (): Dispatch<FormAction> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormDispatch must be used within a FormContextProvider');
  }
  return context[1];
};

export default FormContext;