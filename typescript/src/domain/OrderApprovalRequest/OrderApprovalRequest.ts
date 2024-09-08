class OrderApprovalRequest {
  constructor(
    public readonly orderId: number,
    public readonly approved: boolean
  ) {}
}

export default OrderApprovalRequest;

