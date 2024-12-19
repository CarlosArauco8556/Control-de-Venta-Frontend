export interface GetSupplies {
    orderDate:    Date;
    deliveryDate: Date;
    quantity:     number;
    totalPrice:   number;
    productId:    number;
    productName:  string;
    supplyId:     number;
    supplyName:   string;
}