class SellItemRequest {
  constructor(
    private productName: string,
    private quantity: number,
  ) {}

  public getQuantity(): number {
    return this.quantity;
  }

  public getProductName(): string {
    return this.productName;
  }
}

export default SellItemRequest;
