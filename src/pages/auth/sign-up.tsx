import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerCompany } from '@/api/register-company'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signUpForm = z.object({
  companyName: z.string(),
  managerName: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
})
type SignUpForm = z.infer<typeof signUpForm>
export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerCompanyFn } = useMutation({
    mutationFn: registerCompany,
  })
  async function handleSignUp(data: SignUpForm) {
    try {
      await registerCompanyFn({
        companyName: data.companyName,
        managerName: data.managerName,
        email: data.email,
        password: data.password,
      })

      toast.success('Empresa cadastrada com sucesso', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar a Empresa')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie sua conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="companyName">Nome do estabelecimento</Label>
              <Input
                id="companyName"
                type="text"
                {...register('companyName')}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="managerName">Seu Nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email">Seu Email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, voce concorda com os nossos{' '}
              <a className="underline underline-offset-4" href="">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="">
                Políticas de Privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
