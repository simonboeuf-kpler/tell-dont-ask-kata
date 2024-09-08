class Category {
  constructor(
    private readonly name: string,
    private readonly taxPercentage: number
  ) {
    this.name = name;
    this.taxPercentage = taxPercentage;
  }

  // This is not used in this kata but probably has a purpose in a real use case so I'm keeping it
  public getName(): string {
    return this.name;
  }

  public getTaxPercentage(): number {
    return this.taxPercentage;
  }
}

export default Category;

