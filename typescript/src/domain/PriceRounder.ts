class PriceRounder {
  constructor(private readonly price: number) {}

  compute(): number {
    return Math.round(this.price * 100) / 100;
  }
}

export default PriceRounder;
