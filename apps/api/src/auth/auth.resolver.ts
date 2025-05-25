import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthPayload } from './entities/auth_payload.entity'
import { SignInInput } from './dto/signin.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthPayload)
  async signIn(
    @Args('signInput')
    signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput)
    return this.authService.login(user)
  }

}
