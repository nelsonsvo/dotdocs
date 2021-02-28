import { User } from "./../entity/User";
import { Arg, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }
  @Query(() => String)
  hello() {
    return "hello world";
  }

  @Mutation(() => User)
  async createUser(@Arg("username") username: string, @Arg("password") password: string) {
    const hash = await argon2.hash(password);
    const user = User.create({ username, password: hash });
    await User.save(user);

    return user;
  }
}
