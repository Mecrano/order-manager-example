/* eslint-disable no-console */
import React from 'react'
import {
  useOrderQueue,
  useQueueStatus,
  QueueStatus,
} from 'vtex.order-manager/OrderQueue'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import UpdateSelectedAddressMutation from 'vtex.checkout-resources/MutationUpdateSelectedAddress'
import { useMutation } from 'react-apollo'
import { Button } from 'vtex.styleguide'

const MyComponent = () => {
  const { enqueue, listen } = useOrderQueue()
  const { orderForm, setOrderForm } = useOrderForm()

  const queueStatusRef = useQueueStatus(listen)

  const [updateSelectedAddress] = useMutation(UpdateSelectedAddressMutation)

  const handleSelectAddress = async (address: any) => {
    const task = async () => {
      const {
        data: { updateSelectedAddress: newOrderForm },
      } = await updateSelectedAddress({
        variables: {
          address,
        },
      })

      return newOrderForm
    }

    try {
      const newOrderForm = await enqueue(task, 'selectAddress')

      if (queueStatusRef.current === QueueStatus.FULFILLED) {
        setOrderForm(newOrderForm)
      }

      return { success: true, orderForm: newOrderForm }
    } catch (error) {
      if (!error || error.code !== 'TASK_CANCELLED') {
        throw error
      }

      return { success: false }
    }
  }

  return (
    <div>
      <Button
        onClick={() => {
          console.log('OrderForm Edwin', orderForm)
        }}
      >
        OrderForm
      </Button>
      <Button
        onClick={() => {
          const address = {
            addressType: 'residential',
            city: 'Bogotá, D.c.',
            complement: 'piso 1',
            country: 'COL',
            geoCoordinates: [-74.07209014892578, 4.710988521575928],
            neighborhood: 'Barrio',
            number: null,
            postalCode: '11001',
            receiverName: 'Edwin Pruebas',
            reference: null,
            state: 'BOGOTÁ, D.C.',
            street: 'Calle de la fortuna',
            isDisposable: false,
          }

          handleSelectAddress(address)
        }}
      >
        Set Address
      </Button>
      <Button
        onClick={() => {
          const address = {
            addressType: 'search',
            city: 'Medellín',
            complement: 'piso 1',
            country: 'COL',
            geoCoordinates: [-75.5444748, 6.3398571],
            neighborhood: 'Barrio',
            number: '35 - 120',
            postalCode: '05001',
            receiverName: 'Edwin Pruebas',
            reference: null,
            state: 'Antioquia',
            street: 'Diagonal 51l',
            isDisposable: false,
          }

          handleSelectAddress(address)
        }}
      >
        Set Pick up point 2
      </Button>
      <Button
        onClick={() => {
          console.log('queueStatusRef Edwin', queueStatusRef)
        }}
      >
        Estado
      </Button>
    </div>
  )
}

export default MyComponent
