const ENUMS = {
  WAITING_FOR_SELLER_CONFIRM: 'Waiting for Seller Confirmation',
  PROCESSING_ORDER: 'Processing',
  ORDER_COMPLETE: 'Order Completed',
  SHIPPED: 'Shipped',
  RECEIVED: 'Received',
}

const StatusEnumsGraph = {
  WAITING_FOR_SELLER_CONFIRM: 'PROCESSING_ORDER',
  PROCESSING_ORDER: 'SHIPPED',
  SHIPPED: 'RECEIVED',
  RECEIVED: 'ORDER_COMPLETE',
  ORDER_COMPLETE: 'ORDER_COMPLETE',
}

export { ENUMS, StatusEnumsGraph }
