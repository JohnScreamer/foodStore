export interface IFormOrder {
    name: string;
    phone: number;
    person?: number;
    callBack: boolean;
    street?: string;
    houseNumber?: number;
    flatNum?: number;
    floor?: number;
    comment?: string;
    porchNumber?: number;
    restaurant?: "malibu" | "legend" | "friday" | "caribu";
    agreement: true;
}

export interface IActiveFields {
    deliveryType: "delivery" | "selfPickup";
    paymentType: "cash" | "onlineCard" | "courierCard";
    deliveryTime: "inTime" | "asFast";
}
export const activeFiled: IActiveFields = {
    deliveryType: "delivery",
    paymentType: "cash",
    deliveryTime: "inTime",
};

interface IDeliveryTime {
    people: number;
    callBack: boolean;
}
interface IInTime extends IDeliveryTime {
    time: number;
}
interface IAsFastAsPossible extends IDeliveryTime {
    time: boolean;
}

interface ICourierCard {
    courierCard: boolean;
}
interface ICash {
    cash: number;
}

interface IOnlineCard {
    onlineCard: boolean;
}

interface ISelfPickup {
    restaurant: string;
}

interface IDelivery {
    street: string;
    houseNumber: number;
    flatNumber?: number;
    floor?: number;
    comment?: string;
    porchNumber?: number;
}

export const restaurants = [
    { name: "Малібу", value: "malibu" },
    { name: "Легенда", value: "legend" },
    { name: "Пятниця", value: "friday" },
    { name: "Кариби", value: "caribu" },
];

// deliveryType: "delivery" | "selfPickup";
// paymentType: "cash" | "onlineCard" | "courierCard";
// deliveryTime: "inTime" | "asFast";

// deliveryType: IDelivery | ISelfPickup;
// paymentType: ICash | IOnlineCard | ICourierCard;
// deliveryTime: IInTime | IAsFastAsPossible;
// IsAgree: boolean;
