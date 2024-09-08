class Category {
  private taxPercentage: number;

  constructor(taxPercentage: number) {
    this.taxPercentage = taxPercentage;
  }

  public getTaxPercentage(): number {
    return this.taxPercentage;
  }

}

export default Category;

