import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Cart } from "@/types";

// todo: complete this hook later
const useCart = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const getCart = useQuery({
    queryKey:['cart'],
    queryFn: async () => {
      const { data } = await api.get<{ cart: Cart}>('/cart')
      return data.cart
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      const { data } = await api.post<{ cart: Cart }>("/cart", { productId, quantity });
      return data.cart;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeFromCart = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.delete<{ cart: Cart}>(`/cart/${productId}`)
      return data.cart
    },

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] })
  })

  
  return {
    addToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    getCart,
    removeFromCart: removeFromCart.mutate,
    isRemovingFromCart: removeFromCart.isPending
  };
};
export default useCart;
