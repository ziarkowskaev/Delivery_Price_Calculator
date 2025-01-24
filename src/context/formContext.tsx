import { FormInput } from "@/types/types";
import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

type FormAction = {
  type: "SET_FORM_INPUT";
  payload: Partial<FormInput>;
};

const formReducer = (state: FormInput, action: FormAction): FormInput => {
  switch (action.type) {
    case "SET_FORM_INPUT":
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

export const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [form, formDispatch] = useReducer(formReducer, {
    venueSlug: "home-assignment-venue-helsinki",
    cartValue: 0,
    distance: 0,
    orderMinimumNoSurcharge: 0,
    distanceRanges: [
      {
        min: 0,
        max: 500,
        a: 0,
        b: 0,
        flag: null,
      },
      {
        min: 500,
        max: 1000,
        a: 100,
        b: 1,
        flag: null,
      },
      {
        min: 1000,
        max: 0,
        a: 0,
        b: 0,
        flag: null,
      },
    ],
    deliveryBasePrice: 0,
    orderMinimum: 0,
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
    throw new Error("useFormValue must be used within a FormContextProvider");
  }
  return context[0];
};

export const useFormDispatch = (): Dispatch<FormAction> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormDispatch must be used within a FormContextProvider",
    );
  }
  return context[1];
};

export default FormContext;
