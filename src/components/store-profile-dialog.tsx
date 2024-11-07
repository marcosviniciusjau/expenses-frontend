import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedOwner,
  GetManagedOwnerResponse,
} from '@/api/get-managed-owner'
import { getProfile, GetProfileResponse } from '@/api/get-profile'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  managerName: z.string().min(1),
  companyName: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>
export function StoreProfileDialog() {
  const queryClient = useQueryClient()
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      managerName: profile?.managerName ?? '',
      companyName: profile?.companyName ?? '',
    },
  })
  function updateOwnerProfile({
    managerName,
    companyName,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetProfileResponse>([
      'managed-owner',
    ])

    if (cached) {
      queryClient.setQueryData<GetProfileResponse>(['managed-owner'], {
        ...cached,
        companyName,
        managerName,
      })
    }
    return { cached }
  }
  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ managerName, companyName }) => {
      const { cached } = updateOwnerProfile({ managerName, companyName })
      return { previousProfile: cached }
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        updateOwnerProfile(context.previousProfile)
      }
    },
  })
  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        companyName: data.companyName,
      })

      toast.success('Perfil atualizado com sucesso')
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Seu perfil</DialogTitle>
        <DialogDescription>Atualize suas informações</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="managerName">
              Nome do administrador
            </Label>
            <Input
              type="text"
              id="managerName"
              className="col-span-3"
              {...register('managerName')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="companyName">
              Nome da empresa
            </Label>
            <Textarea
              className="col-span-3"
              id="companyName"
              {...register('companyName')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
