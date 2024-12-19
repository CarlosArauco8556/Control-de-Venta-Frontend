export interface Invoice {
    factura:         number;
    code:            string;
    descripcion:     string;
    fecha:           Date;
    priceWithoutVAT: number;
    totalVAT:        number;
    finalPrice:      number;
    saleItems:       SaleItem[];
}

export interface SaleItem {
    productId:          number;
    name:               string;
    quantity:           number;
    price:              number;
    discountPercentage: number;
    total:              number;
}