import OrderApprovalRequest from './OrderApprovalRequest';

export default class OrderApprovalRequestBuilder {
  private orderId: number;
  private approved: boolean;

  setId(id: number): OrderApprovalRequestBuilder {
    this.orderId = id;
    return this;
  }

  deny(): OrderApprovalRequestBuilder {
    this.approved = false;
    return this;
  }

  approve(): OrderApprovalRequestBuilder {
    this.approved = true;
    return this;
  }

  build(): OrderApprovalRequest {
    return new OrderApprovalRequest(
      this.orderId,
      this.approved
    );
  }
}
