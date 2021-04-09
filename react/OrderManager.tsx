import React from 'react'
import { OrderQueueProvider } from 'vtex.order-manager/OrderQueue'
import { OrderFormProvider } from 'vtex.order-manager/OrderForm'

import MyComponent from './components/MyComponent'

const OrderManager = () => {
  return (
    <OrderQueueProvider>
      <OrderFormProvider>
        <MyComponent />
      </OrderFormProvider>
    </OrderQueueProvider>
  )
}

export default OrderManager
