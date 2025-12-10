import { useApi } from "@/lib/api"
import { Address } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



const useAddress = () => {

    const api = useApi()
    const queryClient = useQueryClient()

    const { data: addresses , isError, isLoading } = useQuery({
        queryKey:["addresses"],
        queryFn: async () => {
            const { data } = await api.get<{ addresses: Address[] }>('/users/addresses')

            return data.addresses;
        }
    })

    const addAddressMutation = useMutation({
    mutationFn: async (addressData: Omit<Address, "_id">) => {
      const { data } = await api.post<{ addresses: Address[] }>("/users/addresses", addressData);
      return data.addresses;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: async ({
      addressId,
      addressData,
    }: {
      addressId: string;
      addressData: Partial<Address>;
    }) => {
      const { data } = await api.put<{ addresses: Address[] }>(
        `/users/addresses/${addressId}`,
        addressData
      );
      return data.addresses;
      console.log(data.addresses);
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

    const deleteAddresses = useMutation({
        mutationFn: async (addressId: string) => {
            const { data } = await api.delete<{ addresses: Address[] }>(`/users/addresses/${addressId}`)
            return data.addresses
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['addresses'] }) }
    })

    return {
        addresses: addresses  ?? [],
        isLoading,
        isError,
        deleteAddress: deleteAddresses.mutate,
        isDeletingAddress: deleteAddresses.isPending,
        addAddress: addAddressMutation.mutate,
        isAddingAddress: addAddressMutation.isPending,
        updateAddress: updateAddressMutation.mutate,
        isUpdatingAddress: updateAddressMutation.isPending
    }
}

export default useAddress