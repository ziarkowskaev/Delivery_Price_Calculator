import { Venue } from "@/types/types";
import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

type VenueAction = { type: "SET_VENUE"; payload: Venue };

const VenueReducer = (state: Venue, action: VenueAction) => {
  switch (action.type) {
    case "SET_VENUE":
      return {
        ...state,
        ...action.payload,
          };
        default:
          return state;
      }
  };

  const VenueContext = createContext<
    [Venue, Dispatch<VenueAction>] | undefined
  >(undefined);

  export const VenueContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [Venue, VenueDispatch] = useReducer(VenueReducer, {
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
      venueLatitude: 0,
      venueLongitude: 0,
      maxDistance: 10000,
  });

  return (
    <VenueContext.Provider value={[Venue, VenueDispatch]}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenueValue = (): Venue => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error(
      "useVenueValue must be used within a VenueContextProvider",
    );
  }
  return context[0];
};

export const useVenueDispatch = (): Dispatch<VenueAction> => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error(
      "useVenueDispatch must be used within a VenueContextProvider",
    );
  }
  return context[1];
};

export default VenueContext;
