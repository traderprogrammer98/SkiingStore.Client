import { createContext, PropsWithChildren, useContext, useState } from "react"
import { Basket } from "../models/basket"
import { produce } from "immer"

interface StoreContextValue {
  basket: Basket | null
  setBasket: (basket: Basket) => void
  removeItem: (productId: number, quantity: number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
)
export const useStoreContext = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw Error("ooops we do not seem to be inside the provider.")
  }
  return context
}
export const StoreProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [basket, setBasket] = useState<Basket | null>(null)

  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return
    const basketItems = basket.basketItems
      .map((item) => {
        if (item.productId === productId) {
          item.quantity -= quantity
        }
        return item
      })
      .filter((item) => item.quantity > 0)
    const newBasket = produce(basket, (draft) => {
      draft.basketItems = basketItems
    })
    setBasket(newBasket)
  }
  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  )
}
